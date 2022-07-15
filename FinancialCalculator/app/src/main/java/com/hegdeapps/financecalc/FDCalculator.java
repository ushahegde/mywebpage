package com.hegdeapps.financecalc;

import android.app.ActionBar;
import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextUtils;
import android.text.TextWatcher;
import android.view.*;
import android.view.inputmethod.InputMethodManager;
import android.widget.*;

import java.lang.NumberFormatException;
import java.util.* ;

public class FDCalculator extends Activity implements TextWatcher, AdapterView.OnItemSelectedListener {
    static String OTHER_BANK ="" ;
    private  Spinner      spPeriod   ;
    private    EditText    etPeriod    ;  
         EditText  etInterestRate ;
       String    mBankName;
    private    List<String>    mBankList  ;    
        Spinner   spBank     ;
    private     int mType = 0;
      String       mPeriodType   ;
    private int mPeriod = 0;
    private  boolean   mFieldsFilled = false;
    private  boolean   mAmtFilled = false;
    private  boolean   mRateFilled = false;
    private  boolean   mDurationFilled = false;
    private boolean    mCompareScreenShown = false;
    private  String   mShareString = "";
    private  int mAmount = 0;
    private double mRate =0f ;
    private    String mDurationType       = null;
    private String    mTypeOfFd         ;
    private  String   mAmountStr         ;
    private String     mRateStr       = null;
    private  String   mPeriodStr       = null;

    //private final String Rupee = MyConstants.rupee;
    private   String  mCompFreqQtrly      ;
    private  String   mCompFreqMthly ;
    private  String   mCompFreqYrly     ;
    private EditText etAmt1;
    private EditText etAmt2;
    private EditText etRate1;
    private EditText etRate2;
    private EditText etDuration1;
    private EditText etDuration2;
    private Spinner spBank1;
    private Spinner spBank2;
    private Spinner spPeriodType;
    private Spinner spTypeOfFd;
    private Spinner spCompFreq;
    private CheckBox cbSeniorCitizen;
    private LinearLayout resLayout;
//    private boolean mSeniorCitizenCompare;


    @Override   public void onCreate(Bundle savedInstanceState      ) {
        super.onCreate(savedInstanceState);

        OTHER_BANK = getResources().getString(R.string.OTHER);
        //  setContentView(R.layout.activity_calculate_rd);
            Intent   intent        = getIntent();
            setContentView(R.layout.fd_calculator);
            Toolbar   toolbar       = findViewById(R.id.toolbar) ;
             if (toolbar != null) {
                toolbar.setTitle("FD");
                setActionBar(toolbar);
                 ActionBar ab = getActionBar();
                if(ab!=null) {
                    ab.setDisplayShowHomeEnabled(true);
                    ab.setDisplayHomeAsUpEnabled(true);
                }
             }

        spPeriod = findViewById(R.id.durationType);
        spPeriod.setOnItemSelectedListener(new     AdapterView.OnItemSelectedListener(){
            @Override public  void onItemSelected(AdapterView p0, View p1, int p2,long p3) {
                mPeriodType = ((TextView)p1).getText().toString();
                calculateInterestRate();
                calculate();
            }

            @Override public void onNothingSelected(AdapterView p0) {
            }
        });
        etInterestRate = findViewById(R.id.rate);
           etPeriod = findViewById(R.id.period);
        etPeriod.addTextChangedListener(this);


        spBank = findViewById(R.id.bankname);
        spBank.setOnItemSelectedListener(  new AdapterView.OnItemSelectedListener()
        {
            @Override
            public void onItemSelected(    AdapterView p0, View p1      , int position, long p3){
                //  mBankName = mBankList.get(position);
                if(spBank.getSelectedItem().toString().equals(OTHER_BANK)){
                    etInterestRate.setText("");
                    etInterestRate.addTextChangedListener(FDCalculator.this);
                }else{
                    etInterestRate.removeTextChangedListener(FDCalculator.this);
               // calculateInterestRate();
                calculate();
                }
            }
            @Override
            public void  onNothingSelected(AdapterView p0) {
                mBankName="";
            }
        });


        mCompFreqQtrly = getResources().getStringArray(R.array.compounding_frequency)[0];
        mCompFreqMthly = getResources().getStringArray(R.array.compounding_frequency)[1];
        mCompFreqYrly = getResources().getStringArray(R.array.compounding_frequency)[2];
      //  Spinner  spDurationType = findViewById(R.id.durationType);
       // setDurationSpinner()
        EditText       etAmt       = findViewById(R.id.amount) ;
        etAmt.addTextChangedListener(this);
       // EditText   etRate       = findViewById(R.id.rate) ;


        CheckBox     cbSenior      = findViewById(R.id.senior);
        cbSenior.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener(){

            @Override public void onCheckedChanged(CompoundButton p0, boolean p1) {
                if(!spBank.getSelectedItem().toString().equals(OTHER_BANK)){

               calculateInterestRate();
               calculate();
                }
            }
        });

        mFieldsFilled = false;
            Spinner spIntPayable  = findViewById(R.id.type_of_fd);
            spIntPayable.setOnItemSelectedListener(this);
        resLayout = findViewById(R.id.resultlayout);
        resLayout.setVisibility(View.INVISIBLE);

        Button btnCalculate = findViewById(R.id.calculate);
        btnCalculate.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                calculate();
                InputMethodManager imm = (InputMethodManager) FDCalculator.this.getSystemService(Activity.INPUT_METHOD_SERVICE);
                imm.hideSoftInputFromWindow(view.getWindowToken(),0);
            }
        });
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu)   {
        MenuInflater  inflater       = getMenuInflater();
        inflater.inflate(R.menu.menu1, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item)       {
          int     id = item.getItemId();
        switch (id) {
            case R.id.compare : showCompareScreen();break;
            case R.id.share : shareDepositDetails();break;
        }
        return false;
    }

    private void shareDepositDetails() {
        calculate();
        if (TextUtils.isEmpty(mShareString)) {
            Toast.makeText(
                this,
                "Unable to share. Please fill in details for calculations.",
                Toast.LENGTH_SHORT
            ).show();
        } else {
            Intent intent = new Intent();
            intent.setAction(Intent.ACTION_SEND);
            intent.setType("text/plain");
            intent.putExtra(Intent.EXTRA_TEXT, mShareString);
            startActivity(Intent.createChooser(intent, "Share via"));
        }
    }

    @Override
    public boolean onPrepareOptionsMenu( Menu menu) {
        MenuItem item = menu.getItem(0);
        if (mCompareScreenShown) {
            item.setTitle("Single");
        } else {
            item.setTitle("Compare");
        }
        return true;
    }

    private void showCompareScreen() {
        ViewSwitcher       switcher  = findViewById(R.id.switcher);
        storeFieldValues();
        if (mCompareScreenShown) {
            mCompareScreenShown = false;
            switcher.showPrevious();
        } else {
            mCompareScreenShown = true;
            switcher.showNext();

                processCompareFields();

        }
        invalidateOptionsMenu();
    }

    private void storeFieldValues() {
        EditText     etAmount       = findViewById(R.id.amount) ;
        String str     = etAmount.getText().toString();
        if (!TextUtils.isEmpty(str)) {
            mAmountStr = str;
        }
        EditText  etRate= findViewById(R.id.rate) ;
        String strRate  = etRate.getText().toString();
        if (!TextUtils.isEmpty(strRate)) {
            mRateStr = strRate;
        }
         etPeriod = findViewById(R.id.period) ;
        String strPeriod  = etPeriod.getText().toString();
        if (!TextUtils.isEmpty(strPeriod)) {
            mPeriodStr = strPeriod;
        }
        Spinner   period_type   = findViewById(R.id.durationType)   ;
        mDurationType = (String) period_type.getSelectedItem();
       // if (mType == MyConstants.EXTRA_FD) {
              spTypeOfFd  = findViewById(R.id.type_of_fd)   ;
            mTypeOfFd = (String) spTypeOfFd.getSelectedItem() ;
       // }
    }

    private void processCompareFields() {
          etAmt1   = findViewById(R.id.amount1);
          etRate1   = findViewById(R.id.rate1);
           etDuration1  = findViewById(R.id.period1);
          etAmt2   = findViewById(R.id.amount2);
         etRate2   = findViewById(R.id.rate2);
         etDuration2   = findViewById(R.id.period2);

         spBank1 = findViewById(R.id.bankname1);
         spBank2 = findViewById(R.id.bankname2);

        spBank1.setOnItemSelectedListener(this);
        spBank2.setOnItemSelectedListener(this);

        cbSeniorCitizen = findViewById(R.id.isSenior);
        cbSeniorCitizen.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton compoundButton, boolean isChecked) {
             //   mSeniorCitizenCompare = isChecked;
                calculateInterestRate();
                calculateFDCompare();
            }
        });

        /* if there are stored fields populate in first fd*/
        if (!TextUtils.isEmpty(mAmountStr)) {
            etAmt1.setText(mAmountStr);
        }
        if (!TextUtils.isEmpty(mRateStr)) {
            etRate1.setText(mRateStr);
        }
        if (!TextUtils.isEmpty(mPeriodStr)) {
            etDuration1.setText(mPeriodStr);
        }
        etAmt1.addTextChangedListener(this);
        etAmt2.addTextChangedListener(this);
        etDuration1.addTextChangedListener( this);
        etDuration2.addTextChangedListener(this);
         spPeriodType = findViewById(R.id.period_type_cmp)   ;
        spPeriodType.setOnItemSelectedListener(this);
         spTypeOfFd       = findViewById(R.id.interest_payable)   ;
        spTypeOfFd.setOnItemSelectedListener(this);

        // spPeriodType.setSelection(0);
        mTypeOfFd = spTypeOfFd.getSelectedItem().toString();

        Button btnCalculateCmp = findViewById(R.id.calculate_compare);
        btnCalculateCmp.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                calculateFDCompare();
            }
        });
        //calculateFDCompare();
    }

    private void setDurationSpinner() {
            Spinner spDurationType = findViewById(R.id.durationType)   ;
        spDurationType.setOnItemSelectedListener(new
            AdapterView.OnItemSelectedListener(){

                @Override
                public void onItemSelected(AdapterView<?> adapterView, View view, int i, long l) {
                    calculate();
                }

                @Override
                public void onNothingSelected(AdapterView<?> adapterView) {

                }
            }  );


    }

    void calculate() {
           boolean validData = true;
            double amount = 0.0;
            double duration = 0.0;
           double  rate = 0.0;
        try {
            if (mCompareScreenShown  ) {
                calculateFDCompare();
                return;
            }


            //single deposit
            EditText etAmount  = findViewById(R.id.amount) ;
            String str = etAmount.getText().toString().trim ();
            if (TextUtils.isEmpty(str)) {
                if (mFieldsFilled) {
                    etAmount.setError("Amount can not be empty!");
                }
                validData = false;
            } else {
                amount = java.lang.Double.valueOf(str);
                if (amount == 0.0) {
                    etAmount.setError("amount can not be zero");
                    validData = false;
                } else {
                    mAmtFilled = true;
                }
            }


            Spinner spDurationType  = findViewById(R.id.durationType)   ;
            String durationType = (String) spDurationType.getSelectedItem();
            EditText etDuration = findViewById(R.id.period)  ;
            str = etDuration.getText().toString().trim ();
            if (TextUtils.isEmpty(str)) {
                if (mFieldsFilled) {
                    etDuration.setError("Duration can not be empty!");
                }
                validData = false;
            } else {
                duration = java.lang.Double.valueOf(str);
                if (duration <= 0) {
                    etDuration.setError("Duration can not be $str");
                    validData = false;
                } else if (durationType.equals( "Years") && duration > 10) {
                    etDuration.setError("Duration can not be greater than 10 years");
                    validData = false;
                } else {
                    mDurationFilled = true;
                }
            }
            if (durationType.equals( MyConstants.P_YEARS) ){
                duration = duration * 12;
            } else if (durationType .equals( MyConstants.P_DAYS) ){
                duration = duration / 30;
            }
            String bank = spBank.getSelectedItem().toString();
            if(!bank.equals(getResources().getString(R.string.OTHER))){
                calculateInterestRate();mRateFilled=true;
            }else{
                   EditText etRate  = findViewById(R.id.rate);
                   str = etRate.getText().toString().trim ();
                if (TextUtils.isEmpty(str)) {
                    if (mFieldsFilled) {
                        etRate.setError("Interest rate can not be empty!");
                    }
                    validData = false;
                }
            }
                EditText etRate  = findViewById(R.id.rate);
                    rate = java.lang.Double.valueOf(etRate.getText().toString());
                    if (rate <= 0 || rate >= 100) {
                        //etRate.setError("Interest rate can not be $rate");
                        validData = false;
                    } else {
                        mRateFilled = true;
                    }


            mFieldsFilled = mAmtFilled && mRateFilled && mDurationFilled;
            if (validData) {
                resLayout.setVisibility(View.VISIBLE);
                mShareString = "Deposit amount"+     MyMethods.formatDouble(amount)+" per month"+
                 "\nRate of Interest "+      rate+"\n% Period in Months   "+duration;
                calcFDMaturity(amount, rate, duration);
                return;

            }
        } catch (NumberFormatException e) {
            Toast.makeText(this, "Error. Number format exception ", Toast.LENGTH_SHORT).show();
        }
    }



    void calculateFDCompare() {

        String strPeriodType = (String) spPeriodType.getSelectedItem();

        Spinner spInterstPayable   = findViewById(R.id.interest_payable)   ;
        String intPayable = (String) spInterstPayable.getSelectedItem();
        String sAmt1 = etAmt1.getText().toString();
        String sAmt2   = etAmt2.getText().toString();

        String sPeriod1  = etDuration1.getText().toString();
        String sPeriod2   = etDuration2.getText().toString();



      /*  Spinner spBank1 = findViewById(R.id.bankname1);*/
        String bank1 = spBank1.getSelectedItem().toString();


        int period1 = Integer.valueOf(sPeriod1);
        int period2 = Integer.valueOf(sPeriod2);
        if(strPeriodType.equals(MyConstants.P_YEARS)){
            period1 = period1*365; period2 = period2*365;
        } else if(strPeriodType.equals("Months")){
            period1 = period1*30; period2 *=30;
        }

        //TODO we need to add senior field later
        boolean isSenior = cbSeniorCitizen.isChecked();
        double rate1 = 0;

        if(bank1.equals(OTHER_BANK)){
            String strRate2 = etRate2.getText().toString();
            if(!TextUtils.isEmpty(strRate2))
                rate1 =Double.valueOf( etRate2.getText().toString());
        }else{
            rate1 = CreateBankRates.getInterestRate(this, bank1,period1,isSenior);
            etRate1.setText(String.valueOf(rate1));
        }

      /*  Spinner spBank2= findViewById(R.id.bankname2);*/
        String bank2 = spBank2.getSelectedItem().toString();
        double rate2 = 0;
        if(bank2.equals(OTHER_BANK)){
            String strRate2 = etRate2.getText().toString();
            if(!TextUtils.isEmpty(strRate2))
                 rate2 =Double.valueOf( etRate2.getText().toString());
        }else{
            rate2 = CreateBankRates.getInterestRate(this, bank2,period2,isSenior);
            etRate2.setText(String.valueOf(rate2));
        }



        String    share1 = "";
        String  share2 = "";
        boolean valid1 = true;
        boolean  valid2 = true;
        if (TextUtils.isEmpty(sAmt1)) {
            valid1 = false;
        } else {
            if (Double.valueOf(sAmt1) <= 0) {
                etAmt1.setError("Deposit amount can not be zero");
                valid1 = false;
            }
        }
        if(rate1==0)
            valid1 = false;
        if(rate2==0)
            valid2 = false;
        if (TextUtils.isEmpty(sPeriod1)) {
            valid1 = false;
        } else {
            if (Integer.valueOf(sPeriod1) <= 0) {
                etDuration1.setError("Period  can not be zero");
                valid1 = false;
            } else if (strPeriodType.equals("Years") && Integer.valueOf(sPeriod1) > 10) {
                valid1 = false;
                etDuration1.setError("Period can not be greater than 10 years");
            }
        }

        /*if(!(TextUtils.isEmpty(sAmt1)  || TextUtils.isEmpty(sPeriod1)
                || TextUtils.isEmpty(sRate1) )) {*/
        if (valid1) {
             double amount1 = Double.parseDouble(sAmt1);

            share1 = "Amount "+   MyMethods.formatDouble(amount1) +"\nRate "+
                    rate1+"\nPeriod in Months "+period1/30;
            TextView  tvMatAmount1       = findViewById(R.id.matAmount1) ;
            TextView  tvInterest1   = findViewById(R.id.interest1) ;
            TextView tvMatAmtLabel   = findViewById(R.id.matAmountlabel) ;
            TextView tvInterestLabel   = findViewById(R.id.interestlabel) ;
            int periodInMonths1 = period1/30;


            if (intPayable.equals("Reinvestment")) {
                double  matAmount1 = findMatCmp(amount1, rate1, periodInMonths1);
                 double interest1 = matAmount1 - amount1;
                    String str = MyMethods.formatDouble(matAmount1);
                tvMatAmount1.setText(str);
                share1 = share1+"\nMaturity Amount "+str;
                tvMatAmtLabel.setText("Maturity Amount");
                tvInterest1.setVisibility(View.VISIBLE);
                str = MyMethods.formatDouble(interest1);
                tvInterest1.setText(str);
                share1 = share1+"\n Interest earned     "+str;
            } else if (intPayable.equals( "Quarterly Payout")) {
                tvMatAmtLabel.setText("Quarterly Interest");
                double interest1 = findQtrlyInt(amount1, rate1) ;//, period1);
                String str = MyMethods.formatDouble(interest1);
                tvMatAmount1.setText(str);
                share1 = share1+"\nQuarterly Interest "+    str;
                double totalInterest = interest1 * periodInMonths1 / 3;
                String strInt = MyMethods.formatDouble(totalInterest);
                tvInterest1.setText(strInt);
                //    TextView tvLabel = (TextView) findViewById(R.id.interestlabel);
                tvInterestLabel.setText("Total interest");
                share1 =  share1+"\nTotal Interest       "+strInt;
            } else {
                tvMatAmtLabel.setText("Monthly Interest");
                double interest1 = findMonthlyInt(amount1, rate1); //, period1);
                String str = MyMethods.formatDouble(interest1);
                tvMatAmount1.setText(str);
                share1 = share1+"\nMonthly Interest:"  +str;
                double totalInterest = interest1 * periodInMonths1;
                String strInt = MyMethods.formatDouble(totalInterest);
                tvInterest1.setText(strInt);
                //      TextView tvLabel = (TextView) findViewById(R.id.interestlabel);
                tvInterestLabel.setText("Total interest");
                share1 = share1+"\nTotal Interest:"+strInt;
            }
            mShareString = "DEPOSIT1\n\n"+share1;
        }
        if (TextUtils.isEmpty(sAmt2)) {
            valid2 = false;
        } else {
            if (java.lang.Double.valueOf(sAmt2) <= 0) {
                etAmt2.setError("Deposit amount can not be zero");
                valid2 = false;
            }
        }
        if (TextUtils.isEmpty(sPeriod2)) {
            valid2 = false;
        } else {
            if (Integer.valueOf(sPeriod2) <= 0) {
                etDuration2.setError("Period  can not be zero");
                valid2 = false;
            } else if (Integer.valueOf(sPeriod2) > 10 && strPeriodType.equals("Years")) {
                etDuration2.setError("Period  can not be more than 10 years");
                valid2 = false;
            }
        }
        if (valid2) {
            int periodInMonths2 = period2/30;
            double amount2 = java.lang.Double.valueOf(sAmt2);
            TextView tvMatAmount2  = findViewById(R.id.matAmount2) ;
            TextView tvInterest2   = findViewById(R.id.interest2) ;
            TextView tvMatAmtLabel  = findViewById(R.id.matAmountlabel) ;
            TextView tvInterestLabel = findViewById(R.id.interestlabel) ;
            share2 = "Amount :"+MyMethods.formatDouble(amount2)+
                "Rate : "+rate2+
                "Period in Months : "+period2;
            if (intPayable.equals("Reinvestment")) {
                double matAmount2 = findMatCmp(amount2, rate2, periodInMonths2);
                double    interest2 = matAmount2 - amount2;
                 String   str = MyMethods.formatDouble(matAmount2);
                tvMatAmount2.setText(str);
                share2 = share2+"\n Maturity Amount : "+str;
                str = MyMethods.formatDouble(interest2);
                share2 =  share2+"\n Interest earned : "+     str;
                tvInterest2.setText(str);
                tvMatAmtLabel.setText("Maturity Amount       ");
                tvInterest2.setVisibility(View.VISIBLE);
                tvInterestLabel.setVisibility(View.VISIBLE);
            } else if (intPayable.equals( "Quarterly Payout")) {
                tvMatAmtLabel.setText("Quarterly Interest");
                double interest2 = findQtrlyInt(amount2, rate2); //, period2);
                String str = MyMethods.formatDouble(interest2);
                tvMatAmount2.setText(str);
                share2 = share2+"\nQuarterly Interest  :"+str;
                double totInterest = interest2 * periodInMonths2 / 3;
                String  strInt = MyMethods.formatDouble(totInterest);
                tvInterest2.setText(strInt);
                tvInterestLabel.setText("Total interest");
                share2 = share2+"\nTotal Interest : "+    strInt;
            } else {
                tvMatAmtLabel.setText("Monthly Interest");
                double interest2 = findMonthlyInt(amount2, rate2) ;//, period2);
                 String str = MyMethods.formatDouble(interest2);
                tvMatAmount2.setText(str);
                share2 = share2+"\nMonthly Interest  :"+str;
                 double totInterest = interest2 * periodInMonths2;
                 String   strInt = MyMethods.formatDouble(totInterest);
                tvInterest2.setText(strInt);
                tvInterestLabel.setText("Total interest");
                share2 = share2+"\nTotal Interest :"+strInt;
            }
            mShareString = mShareString+"\n\nDEPOSIT2\n\n"+share2;
            mShareString = "FD Calculations\n-------------------------------\n"+mShareString;
        }
    }

    private double findMatCmp(  double amount, double  rate, double  periodInMonths  )   {
          int n =4;
         double rate1 = rate / 100.0 / n;
         int period1 = (int) (periodInMonths * n / 12);
        return amount * Math.pow(1 + rate1, period1);
    }

    private void calcFDMaturity(double amount , double rate, double period) {
               Spinner spInterestPayable   = findViewById(R.id.type_of_fd)   ;
               String str = (String) spInterestPayable.getSelectedItem();
         mShareString = "Amount     "+MyMethods.formatDouble(amount)+
                "Rate :%"+rate +
                "Period in Months : "+    period;

             if (str.equals("Reinvestment")) {
                double   matAmount = findMatCmp(  amount,  rate,period);
            //amount * (Math.pow(1 + rate, period1));
               TextView  tvMaturity  = findViewById(R.id.maturity_amt) ;
               String str1 = "Maturity amount       " + MyMethods.formatDouble(matAmount);
               tvMaturity.setText(str1);
               TextView tvInterest  = findViewById(R.id.totalinterest) ;
               double interest = matAmount - amount;
               String str2 = "Interest earned          " + MyMethods.formatDouble(interest);
               tvInterest.setText(str2);
               tvInterest.setVisibility(View.VISIBLE);
               mShareString = mShareString+str1+str2;

        } else if (str.equals("Quarterly Payout")) {
            rate = rate / 400;
               double    period1 = 1.0; // period / 3;//90.0;//we need this to be real
                double   quarterlyInterest = amount * period1 * rate;
                 TextView  tvMaturity   = findViewById(R.id.maturity_amt) ;
               String outStr = "Quarterly Interest       " + MyMethods.formatDouble(quarterlyInterest);
            tvMaturity.setText(outStr);
               TextView    tvInterest  = findViewById(R.id.totalinterest) ;
                 double  totalInterest = quarterlyInterest * period / 3;
                String   strInt = "Total interest       " + MyMethods.formatDouble(totalInterest);
            tvInterest.setText(strInt);
            //tvInterest.setVisibility(View.INVISIBLE);
            mShareString = mShareString+outStr+strInt;

        } else if (str.equals( "Monthly Payout")) {
            rate = rate / 1200;
               double    period1 = 1.0; // period / 3;//90.0;//we need this to be real
              double     monthlyInterest = amount * period1 * rate;
                 TextView  tvMaturity   = findViewById(R.id.maturity_amt) ;
               String    outStr = "Monthly Interest       " + MyMethods.formatDouble(monthlyInterest);
            tvMaturity.setText(outStr);
                   TextView tvInterest  = findViewById(R.id.totalinterest) ;
                double   totalInterest = monthlyInterest * period;
               String    strInt = "Total interest       " + MyMethods.formatDouble(totalInterest);
            tvInterest.setText(strInt);
            mShareString = mShareString+outStr+strInt;

        }
        mShareString = "FD Calculations\n------------------------------------------\n$mShareString";
    }

    @Override  public void beforeTextChanged(      CharSequence s, int start,int count, int after ) {}
    @Override public void onTextChanged(CharSequence s, int start,int before ,int  count) {}
    @Override  public void afterTextChanged(Editable s) {
         String   str     = s.toString();
        str = str.trim();
        if (!TextUtils.isEmpty(str)) {
            calculate();
        }
    }

    void calculateInterestRate() {
       String periodType = spPeriod.getSelectedItem().toString();
       String periodStr = etPeriod.getText().toString();
       int period = 0;
        if(!TextUtils.isEmpty(periodStr)) {

             period = Integer.valueOf(etPeriod.getText().toString());
        }
         if (periodType.equals("Years")) {
              period = period * 365;
         }else if(periodType.equals("Months")){
             int y = period/12;
             period = y*365 + (period%12)*30;
         }
         String bankName = (String) spBank.getSelectedItem();
         CheckBox cbSenior = findViewById(R.id.senior) ;
          boolean isSenior = cbSenior.isChecked();
          double rate = CreateBankRates.getInterestRate(this, bankName,period,isSenior);
         etInterestRate.setText(String.valueOf(rate));
    }

    @Override  public void onItemSelected( AdapterView p, View v,int  position,long l) {
        calculate();
    }

    @Override
    public void onNothingSelected(      AdapterView p) {}




          private double findQtrlyInt(double amount , double rate) {
                double   rate1 = rate / 400;
                return amount * 1 * rate1;
          }

          private double findMonthlyInt(double amount, double rate)
          {
            rate = rate / 1200;
            return amount * 1 * rate;
        }

    class InterestTextWatcher implements TextWatcher{

    @Override
    public void beforeTextChanged(CharSequence charSequence, int i, int i1, int i2) {

    }

    @Override
    public void onTextChanged(CharSequence charSequence, int i, int i1, int i2) {

    }

    @Override
    public void afterTextChanged(Editable editable) {
        calculateInterestRate();
        calculate();
    }
}
}
