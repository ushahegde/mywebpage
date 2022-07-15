package com.hegdeapps.financecalc;

import android.app.ActionBar;
import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextUtils;
import android.text.TextWatcher;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.inputmethod.InputMethodManager;
import android.widget.*;

import java.lang.NumberFormatException;

public class RDCalculator extends Activity implements TextWatcher, AdapterView.OnItemSelectedListener {
     boolean mIsSenior;
    

private int mType;
private String mPeriodType;
private int mPeriod;
private boolean mFieldsFilled;
private boolean mAmtFilled;
private boolean mRateFilled;
private boolean mDurationFilled;
private boolean mCompareScreenShown;
private String mShareString="";
private int mAmount;
private double mRate;
String mDurationType;
private String mTypeOfFd;
private String mAmountStr;
private String mRateStr;
private String mPeriodStr;
//private final String Rupee = MyConstants.rupee;
private String mCompFreqQtrly;
private String mCompFreqMthly;
private String mCompFreqYrly;
private String[] mBankList;
//private String mBankName;
    private    EditText etAmt1 ;
    EditText etRate1 ;
    private EditText etDuration1;
    private EditText etAmt2 ;
    EditText etRate2;
    private EditText etDuration2;
    Spinner spBank1;
    Spinner spBank2;
    private CheckBox cbSenior;
    String OTHER_BANK;
    private Button btnCalculateCompare;
    private LinearLayout resultLayout;


    @Override   public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

         setContentView(R.layout.activity_calculate_rd);
        OTHER_BANK = getResources().getString(R.string.OTHER);

        Toolbar toolbar = (Toolbar)findViewById(R.id.toolbar);
         if(toolbar!=null){
                 toolbar.setTitle("RD");
             setActionBar(toolbar);
             ActionBar ab = getActionBar();
             ab.setDisplayShowHomeEnabled(true);
             ab.setDisplayHomeAsUpEnabled(true);
         }

         Spinner spDurationType = (Spinner)findViewById(R.id.durationType);
         setDurationSpinner();
         EditText etAmt = (EditText)findViewById(R.id.amount);
         EditText etRate = (EditText)findViewById(R.id.rate);
         EditText etDuration = (EditText)findViewById(R.id.period);

         etAmt.addTextChangedListener(this);
         etRate.addTextChangedListener(this);


        etDuration.addTextChangedListener(this);

        Spinner spBank = findViewById(R.id.bankname);
        spBank.setOnItemSelectedListener( new AdapterView.OnItemSelectedListener(){
             @Override public void onItemSelected( AdapterView p0, View p1 , int position, long p3) {
                 String str = getResources().getStringArray(R.array.bankNames)[position];
                 if(str.equals(OTHER_BANK)){
                     etRate.setText("");
                     etRate.addTextChangedListener(RDCalculator.this);
                 }else{
                     etRate.removeTextChangedListener(RDCalculator.this);
                 }
                calculate();
            }

             @Override public void onNothingSelected( AdapterView p) {
               // mBankName="";
            }
        });
        spDurationType.setOnItemSelectedListener( new AdapterView.OnItemSelectedListener(){
             @Override public void  onItemSelected(AdapterView p0, View p1 , int position, long p3) {
                mDurationType = ((TextView)p1).getText().toString();
                //calculateInterestRate(false);
                calculate();
            }

            @Override public void onNothingSelected( AdapterView p) {
            }
        });

         cbSenior = findViewById(R.id.isSenior);
        cbSenior.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener(){
             @Override public void onCheckedChanged(CompoundButton p0, boolean isChecked) {
                mIsSenior = isChecked;
             //   calculateInterestRate(false);
                calculate();
            }
        });
        Button btnCalculate = findViewById(R.id.calculate);
        btnCalculate.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                calculate();
                InputMethodManager imm = (InputMethodManager) RDCalculator.this.getSystemService(Activity.INPUT_METHOD_SERVICE);
                imm.hideSoftInputFromWindow(view.getWindowToken(),0);
            }
        });
        mFieldsFilled = false;
        resultLayout = findViewById(R.id.resultlayout);
        resultLayout.setVisibility(View.INVISIBLE);
    }

    private void calculateInterestRate(boolean isCompareScreen) {
        if(isCompareScreen){
            String strBank1 = spBank1.getSelectedItem().toString();
            String strBank2 = spBank2.getSelectedItem().toString();
            boolean isSenior = cbSenior.isChecked();
            String strNumDays1 = etDuration1.getText().toString();
            int numDays1 = 0;
            int numDays2 = 0;
            if(!TextUtils.isEmpty(strNumDays1)){
                numDays1 =  Integer.valueOf(strNumDays1);
            }
            String strNumDays2 = etDuration2.getText().toString();
            if(!TextUtils.isEmpty(strNumDays2)){
                numDays2 = Integer.valueOf(strNumDays2);
            }

            Spinner spPeriod = findViewById(R.id.period_type_cmp);
            String periodType = spPeriod.getSelectedItem().toString();
            if(periodType.equals(MyConstants.P_YEARS)){
                numDays1 *=365;
                numDays2*=365;
            }else if(periodType.equals(MyConstants.P_MONTHS)){
                numDays1 *=30;
                numDays2*=30;
            }
            if(numDays1!=0 && !strBank1.equals(OTHER_BANK)){
            double rate1 = CreateBankRates.getRDInterestRate(this,numDays1,strBank1,isSenior);
                etRate1.setText(String.valueOf(rate1));
            }
            if(numDays2!=0 && !strBank2.equals(OTHER_BANK)){
            double rate2 = CreateBankRates.getRDInterestRate(this,numDays2,strBank2,isSenior);

            etRate2.setText(String.valueOf(rate2));
            }

        }else{
        Spinner spPeriod = findViewById(R.id.durationType);
        String periodType = spPeriod.getSelectedItem().toString();
        EditText etPeriod = findViewById(R.id.period);
        String periodStr = etPeriod.getText().toString();
        int period = 0;
        if(TextUtils.isEmpty(periodStr))
            period = 0;
        else{
            period = Integer.valueOf(etPeriod.getText().toString());
        }

        Spinner spBank = findViewById(R.id.bankname);
        String bankName = (String) spBank.getSelectedItem();
            if (periodType.equals("Years")) {
            period = period * 365;
        }else if(periodType.equals("Months")){
            int y = period/12;
            period = y*365 + (period%12)*30;
        }
        EditText etRate = findViewById(R.id.rate);
        double rate = CreateBankRates.getRDInterestRate(this,period,bankName,mIsSenior);
        etRate.setText(String.valueOf(rate));
        }

    }

     @Override public boolean onCreateOptionsMenu( Menu menu) {
         MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.menu1, menu);
        return true;
    }

     @Override public boolean onOptionsItemSelected( MenuItem item) {
        int id = item.getItemId();
        switch (id) {
            case R.id.compare : showCompareScreen(); break;
            case R.id.share: shareDepositDetails(); break;
        }
        return false;
    }

    private void shareDepositDetails() {
        calculate();
            if(TextUtils.isEmpty(mShareString)){
                Toast.makeText(this,"Unable to share. Please fill in details for calculations.",Toast.LENGTH_SHORT).show();
            }else {
                Intent intent = new Intent();
                intent.setAction(Intent.ACTION_SEND);
                intent.setType("text/plain");

                intent.putExtra(Intent.EXTRA_TEXT, mShareString);
                startActivity(Intent.createChooser(intent, "Share via"));
            }
        }


     @Override public boolean  onPrepareOptionsMenu( Menu menu) {
        MenuItem item = menu.getItem(0);
        if (mCompareScreenShown) {
            item.setTitle("Single");
        } else {
            item.setTitle("Compare");
        }
        return true;
    }

    private  void showCompareScreen() {
        ViewSwitcher switcher = (ViewSwitcher) findViewById(R.id.switcher);
        storeFieldValues();
        if (mCompareScreenShown) {
            mCompareScreenShown = false;
            switcher.showPrevious();
        } else {
            mCompareScreenShown = true;
            switcher.showNext();

            processCompareRDFields();

        }
        invalidateOptionsMenu();

    }

    private  void storeFieldValues() {
        EditText etAmount = (EditText)findViewById(R.id.amount);
        String str = etAmount.getText().toString();
        if(!TextUtils.isEmpty(str)){
            mAmountStr =str;
        }
        EditText etRate = (EditText)findViewById(R.id.rate);
        String strRate = etRate.getText().toString();
        if(!TextUtils.isEmpty(strRate)){
            mRateStr =strRate;
        }
        EditText etPeriod = (EditText)findViewById(R.id.period);
        String strPeriod = etPeriod.getText().toString();
        if(!TextUtils.isEmpty(strPeriod)){
            mPeriodStr = strPeriod;
        }
        Spinner period_type = (Spinner)findViewById(R.id.durationType);
        mDurationType =(String) period_type.getSelectedItem();
        if(mType==MyConstants.EXTRA_FD){
            Spinner spTypeOfFd = (Spinner)findViewById(R.id.type_of_fd);
            mTypeOfFd = (String)spTypeOfFd.getSelectedItem();
        }

    }

    private  void processCompareRDFields() {
        etAmt1 = (EditText) findViewById(R.id.amount1);
        etRate1 = (EditText) findViewById(R.id.rate1);
        etDuration1 = (EditText) findViewById(R.id.period1);
        etAmt2 = (EditText) findViewById(R.id.amount2);
        etRate2 = (EditText) findViewById(R.id.rate2);
        etDuration2 = (EditText) findViewById(R.id.period2);

        etAmt1.addTextChangedListener(this);
        etAmt2.addTextChangedListener(this);

        etDuration1.addTextChangedListener(this);

        etDuration2.addTextChangedListener(this);

        etRate1.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence charSequence, int i, int i1, int i2) {

            }

            @Override
            public void onTextChanged(CharSequence charSequence, int i, int i1, int i2) {

            }

            @Override
            public void afterTextChanged(Editable editable) {
                String str = spBank1.getSelectedItem().toString();
                if(str.equals(OTHER_BANK)){
                    etRate1.setText("");
                    calculateRDCompare();
                }
            }
        });
        etRate2.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence charSequence, int i, int i1, int i2) {

            }

            @Override
            public void onTextChanged(CharSequence charSequence, int i, int i1, int i2) {

            }

            @Override
            public void afterTextChanged(Editable editable) {
                String str = spBank2.getSelectedItem().toString();
                if(str.equals(OTHER_BANK)){
                    etRate2.setText("");
                    calculateRDCompare();
                }
            }
        });

        spBank1 = findViewById(R.id.spBank1);
        spBank2 = findViewById(R.id.spBank2);
        spBank1.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> adapterView, View view, int i, long l) {
               /* if(spBank1.getSelectedItem().toString().equals(OTHER_BANK)){
                    etRate2.addTextChangedListener(RDCalculator.this);
                }else{
                    etRate2.removeTextChangedListener(RDCalculator.this);*/
                    calculateRDCompare();
                //}
            }

            @Override
            public void onNothingSelected(AdapterView<?> adapterView) {

            }
        });
        spBank2.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> adapterView, View view, int i, long l) {
              /*  if(spBank2.getSelectedItem().toString().equals(OTHER_BANK)){
                    etRate2.addTextChangedListener(RDCalculator.this);
                }else{
                    etRate2.removeTextChangedListener(RDCalculator.this);*/
                calculateRDCompare();
              /*  }*/
            }

            @Override
            public void onNothingSelected(AdapterView<?> adapterView) {

            }
        });

        cbSenior = findViewById(R.id.cbIsSenior);
        cbSenior.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton compoundButton, boolean b) {

                calculate();
            }
        });
        btnCalculateCompare = findViewById(R.id.calc_cmp);
        btnCalculateCompare.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                calculateRDCompare();
            }
        });
        if(!TextUtils.isEmpty(mAmountStr)){
            etAmt1.setText(mAmountStr);
        }
        if(!TextUtils.isEmpty(mRateStr)){
            etRate1.setText(mRateStr);
        }
        if(!TextUtils.isEmpty(mPeriodStr)){
            etDuration1.setText(mPeriodStr);
        }

        Spinner spPeriodType = (Spinner)findViewById(R.id.period_type_cmp);

        spPeriodType.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> adapterView, View view, int i, long l) {
                //calculateInterestRate(true);
                calculate();
            }

            @Override
            public void onNothingSelected(AdapterView<?> adapterView) {

            }
        });
        if(mDurationType.equals(MyConstants.P_YEARS)){
            spPeriodType.setSelection(0);
        } else if (mDurationType.equals(MyConstants.P_MONTHS)){
            spPeriodType.setSelection(1);
        }


        if (!TextUtils.isEmpty(mAmountStr)) {
            etAmt1.setText(mAmountStr);
        }
        if (!TextUtils.isEmpty(mRateStr)) {
            etRate1.setText(mRateStr);
        }
        if (!TextUtils.isEmpty(mPeriodStr)) {
            etDuration1.setText(mPeriodStr);
        }

    }


    private  void setDurationSpinner() {
        Spinner spDurationType = (Spinner)findViewById(R.id.durationType);

        spDurationType.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                calculate();
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {
                // mPeriodType = getResources().getStringArray(R.array.period_type)[0];

            }
        });
    }

     void calculate() {
        boolean validData = true;
        double amount=0 ;
        double duration=0;
        double rate=0;
        try {

            if(mCompareScreenShown ){
                calculateRDCompare();
                return;
            }
            //single deposit
            EditText etAmount = (EditText) findViewById(R.id.amount);
            String str = etAmount.getText().toString().trim();
            if (TextUtils.isEmpty(str)) {
                if(mFieldsFilled) {
                    etAmount.setError("Amount can not be empty!");
                }
                validData = false;
            } else {
                amount = Double.valueOf(str);
                if (amount == 0) {
                    etAmount.setError("amount can not be zero");
                    validData = false;
                }else{
                    mAmtFilled = true;
                }
            }


            Spinner spDurationType = (Spinner)findViewById(R.id.durationType);
            String durationType = (String)spDurationType.getSelectedItem();
            EditText etDuration = (EditText) findViewById(R.id.period);
            str = etDuration.getText().toString().trim();
            if (TextUtils.isEmpty(str)) {
                if(mFieldsFilled) {
                    etDuration.setError("Duration can not be empty!");
                }
                validData = false;
            } else {
                duration  = Double.valueOf(str);
                if (duration <= 0) {
                    etDuration.setError("Duration can not be " + str);
                    validData = false;
                }else if(durationType.equals("Years")&&duration>99) {
                    etDuration.setError("Duration can not be greater than 99 years");
                    validData = false;
                }else
                {
                    mDurationFilled = true;
                }
            }
            if (durationType.equals(MyConstants.P_YEARS)) {
                duration = duration * 12;
            }else if (durationType.equals(MyConstants.P_DAYS)){
                duration = duration/30;
            }
            Spinner spBank = findViewById(R.id.bankname);
            String bankName = spBank.getSelectedItem().toString();
            rate = 0;
            if(!bankName.equals(OTHER_BANK)){
                calculateInterestRate(false);
            }
            EditText etRate = (EditText) findViewById(R.id.rate);
            str = etRate.getText().toString().trim();

            if (!TextUtils.isEmpty(str)) {

                rate = Double.valueOf(str);
                if (rate <= 0 || rate >= 100) {
       //             etRate.setError("Interest rate can not be " + rate);
                    validData = false;
                }else{
                    mRateFilled = true;
                }
            }
            mFieldsFilled = mAmtFilled && mRateFilled && mDurationFilled;
            if (validData) {
                resultLayout.setVisibility(View.VISIBLE);
                mShareString = "Deposit amount : "+MyMethods.formatDouble(amount)
                        +" per month\nRate of Interest : "+rate+"% \nPeriod in Months : "+duration+"\n";

                double i = rate / 400;//quarterly interest rate
                double n = duration/3;//90.0;//number of quarters in the period

                double maturityAmt = amount * (Math.pow(1 + i, n) - 1) / (1 - Math.pow(1 + i, -1 / 3.0));
                TextView tvMaturity = (TextView)findViewById(R.id.maturity_amt);
                String str1 = "Maturity amount:  "+MyMethods.formatDouble(maturityAmt);
                tvMaturity.setText(str1);
                mShareString = mShareString +"\n"+str1;

                double amountPayable = amount*duration;
                double interestEarned = maturityAmt - amountPayable;
                TextView tvAmtPayable = (TextView)findViewById(R.id.amountpayable);
                str1 = "Total deposits: "+MyMethods.formatDouble(amountPayable);
                tvAmtPayable.setText(str1);
                mShareString = mShareString+"\n"+str1;
                TextView tvInterest = (TextView)findViewById(R.id.totalinterest);
                str1 = "Interest earned:   "+MyMethods.formatDouble(interestEarned) ;
                tvInterest.setText(str1);
                mShareString = mShareString+"\n"+str1;
                mShareString = "RD Calculations\n-------------------------------------------------\n"+mShareString;
            }


        }catch (NumberFormatException e){
            Toast.makeText(this,"Error. Number format exception ",Toast.LENGTH_SHORT).show();
        }

    }

     void calculateRDCompare() {
        Spinner spPeriodType = (Spinner) findViewById(R.id.period_type_cmp);
        String periodType = (String) spPeriodType.getSelectedItem();

        String sAmt1 = etAmt1.getText().toString();
        String sAmt2 = etAmt2.getText().toString();
        String sRate1 = etRate1.getText().toString();
        String sRate2 = etRate2.getText().toString();
        String sPeriod1 = etDuration1.getText().toString();
        String sPeriod2 = etDuration2.getText().toString();
        String share1 ="";
        String share2 = "";

        /**todo fix this so that error messages are not shown together**/
        boolean valid1 = true;
        if(TextUtils.isEmpty(sAmt1)){
            valid1 = false;
        }else{
            if(Double.valueOf(sAmt1)<=0){
                etAmt1.setError("Deposit amount can not be zero");
                valid1 = false;
            }
        }

        if(TextUtils.isEmpty(sPeriod1)){
            valid1 = false;
        }else{
            if(Integer.valueOf(sPeriod1)<=0){
                etDuration1.setError("Period  can not be zero");
                valid1 = false;
            }else if(periodType.equals("Years")&&Integer.valueOf(sPeriod1)>99){
                valid1 = false;
                etDuration1.setError("Period can not be greater than 99 years");
            }
        }
        String strBank1 = spBank1.getSelectedItem().toString();
        if(!strBank1.equals(OTHER_BANK)){
            calculateInterestRate(true);
        }
        String strBank2=spBank2.getSelectedItem().toString();
        if(!strBank2.equals(OTHER_BANK)){
            calculateInterestRate(true);
        }
        if(TextUtils.isEmpty(sRate1)){
            valid1 = false;
        }else{
            if(Double.valueOf(sRate1)<=0  || Double.valueOf(sRate1)>=100){
                etRate1.setError("Interest rate can not be "+sRate1);
                valid1 = false;
            }
        }


        if(valid1){
            int period1 = Integer.valueOf(sPeriod1);
            if (periodType.equals(MyConstants.P_YEARS)) {
                period1 = period1 * 12;
            }
            TextView tvTotalAmount1 = (TextView) findViewById(R.id.totalamount1);

            TextView tvInterest1 = (TextView) findViewById(R.id.interest1);
            double amount1 = Double.valueOf(sAmt1);
            double rate1 = Double.valueOf(sRate1);

            share1 = "Deposit Amount : " + MyMethods.formatDouble(amount1) + " per month\nRate of interest: " + rate1 + "%\nPeriod in Months : " + period1;
            double totalAmount1 = amount1 * period1;
            double matAmount1 = findRDMat(amount1, rate1, period1);
            double interest1 = matAmount1 - totalAmount1;
            String str = MyMethods.formatDouble(matAmount1);

            TextView tvMatAmount = (TextView) findViewById(R.id.matAmount1);
            tvMatAmount.setText(str);
            share1 = share1 + "\nMaturity Amount:" + str;
            str = MyMethods.formatDouble(totalAmount1);

            tvTotalAmount1.setText(str);
            share1 = share1 + "\nTotal Deposits:" + str;
            str = MyMethods.formatDouble(interest1);

            tvInterest1.setText(str);
            mShareString = "DEPOSIT1\n" + share1 +
                    "\nInterest Earned:" + str;


        }
        boolean valid2= true;
        double amount2=0;
        int period2=0;
        double rate2=0;
        if(TextUtils.isEmpty(sAmt2)){
            valid2 = false;
        }else{
            amount2 = Double.valueOf(sAmt2);
            if(amount2<=0){
                etAmt2.setError("Deposit amount can not be zero");
                valid2 = false;
            }
        }
        if(TextUtils.isEmpty(sRate2)){
            valid2= false;
        }else{
            rate2 = Double.valueOf(sRate2);
            if(rate2<=0){
                etRate2.setError("Interest rate can not be zero");
                valid2 = false;
            }
        }
        if(TextUtils.isEmpty(sPeriod2)){
            valid2 = false;
        }else{
            period2 = Integer.valueOf(sPeriod2);
            if(period2<=0){
                etDuration2.setError("Period  can not be zero");
                valid2 = false;
            }
        }
        if(valid2){
          /*  boolean invalid2 = false;
            //      int amount2 = Integer.valueOf(sAmt2);
            if (amount2 <= 0) {
                etAmt2.setError("Rate of interest  can not be zero");
                invalid2 = true;
            }

            //      double rate2 = Double.valueOf(sRate2);
            if (rate2 <= 0) {
                etRate2.setError("Rate of interest  can not be zero");
                invalid2 = true;
            }

            //      int period2 = Integer.valueOf(sPeriod2);
            if (period2 <= 0) {
                etDuration2.setError("Rate of interest  can not be zero");
                invalid2 = true;
            }
            if (!invalid2) {*/
                if (periodType.equals(MyConstants.P_DAYS)) {

                    period2 = period2 / 30;
                } else if (periodType.equals(MyConstants.P_YEARS)) {

                    period2 = period2 * 12;
                }


                TextView tvTotalAmount2 = (TextView) findViewById(R.id.totalamount2);

                TextView tvMatAmount2 = (TextView) findViewById(R.id.matAmount2);

                TextView tvInterest2 = (TextView) findViewById(R.id.interest2);


                share2 = "Deposit Amount : " + MyMethods.formatDouble(amount2) + " per month \nRate of interest: " + rate2 + "%\nPeriod in Months : " + period2;


                double totalAmount2 = amount2 * period2;


                double matAmount2 = findRDMat(amount2, rate2, period2);
                double interest2 = matAmount2 - totalAmount2;


                String str = MyMethods.formatDouble(matAmount2);

                tvMatAmount2.setText(str);
                share2 = share2 + "\nMaturity Amount : " + str;

                str = MyMethods.formatDouble(totalAmount2);

                share2 = share2 + "\nTotal Deposits :" + str;
                tvTotalAmount2.setText(str);

                str = MyMethods.formatDouble(interest2);


                tvInterest2.setText(str);
                share2 = share2 + "\nInterest Earned : " + str;
                mShareString += "\n\nDEPOSIT2\n" + share2;
                mShareString = "RD Calculations\n-------------------------------------------------------------\n" + mShareString;

        //    }
        }

    }

    private  double findMatCmp( double amount, double rate, double periodInMonths, String cmpFreq) {
        int n;
        if(cmpFreq.equals(mCompFreqQtrly)){
            n = 4;
        }else if (cmpFreq.equals(mCompFreqMthly)){
            n = 12;
        }else{
            n =1;
        }
        rate =( rate/100 ) / n;
        double period1 = (periodInMonths*n)/12;
        return amount*(Math.pow(1+rate,period1));
    }


    @Override
    public void beforeTextChanged(CharSequence s, int start, int count, int after) {

    }

    @Override
    public void onTextChanged(CharSequence s, int start, int before, int count) {

    }
     @Override public  void afterTextChanged( Editable s) {
         String str = s.toString();
         str = str.trim();
         if(!TextUtils.isEmpty(str)) {

             calculate();
         }
    }
    @Override
    public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
        calculate();
    }

    @Override
    public void onNothingSelected(AdapterView<?> parent) {

    }

    private static double findRDMat(double amount, double rate, int period) {
        double i = rate / 400;//quarterly interest rate
        double n = period/3.0;//90.0;//number of quarters in the period

        double maturityAmt = amount * (Math.pow(1 + i, n) - 1) / (1 - Math.pow(1 + i, -1 / 3.0));
        return maturityAmt;
    }
    private static double findQtrlyInt(double amount, double rate/*, double periodInMonths*/) {
        double rate1 = rate / 400;
        double SI = amount * 1 * rate1;
        return SI;
    }

    private static double findMonthlyInt(double amount, double rate/*, int periodInMonths*/) {
        rate = rate/1200;
        double SI = amount*1*rate;
        return SI;
    }
    private static double findMat(int amount, double rate, double periodInMonths) {

        rate = rate/400;//quarterly rate
        double period1 = periodInMonths/3; //in quarters
        return amount*(Math.pow(1+rate,period1));
    }



}