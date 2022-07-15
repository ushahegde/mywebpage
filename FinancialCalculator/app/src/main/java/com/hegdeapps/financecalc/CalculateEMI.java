package com.hegdeapps.financecalc;

import android.app.ActionBar;
import android.app.Activity;
import android.app.Dialog;
import android.app.MediaRouteButton;
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
import android.widget.AdapterView;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.ListView;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;
import android.widget.Toolbar;
import android.widget.ViewSwitcher;


import java.net.CacheRequest;
import java.util.ArrayList;
import java.util.Locale;

public class CalculateEMI extends Activity implements TextWatcher {

    private boolean mCompareEnabled;
    private int mLoanAmount,mPeriod;
    private double mRate;
    private String mPeriodType;
    private LinearLayout resLayout;
    private Button paymentDetails;

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.menu1,menu);
        return  true; 
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
         switch(item.getItemId()){
             case R.id.compare: showCompareLayout();
                 break;
             case R.id.share:shareEMIDetails();
                 break;
         }
         return false;
    }

    private void shareEMIDetails() {
        boolean valid = calculate();
        if(!valid){
            Toast.makeText(this,"Fill in details before sharing ",Toast.LENGTH_SHORT).show();
            return;
        }
        StringBuilder builder = new StringBuilder();
        builder.append("EMI calculations:\n ");
        builder.append("----------------------------------------------------------------\n");

        if (mCompareEnabled) {
            EditText etLoanAmount1 = (EditText) findViewById(R.id.loanamount1);
            EditText etLoanAmount2 = (EditText) findViewById(R.id.loanamount2);

            String str1 = etLoanAmount1.getText().toString().trim();
            builder.append("LOAN1\nLoan amount " + str1 + "\n ");


            EditText etRate1 = (EditText) findViewById(R.id.rate1);
            EditText etRate2 = (EditText) findViewById(R.id.rate2);

            str1 = etRate1.getText().toString().trim();
            builder.append("Rate " + str1 + "%\n ");

            EditText etDuration1 = (EditText) findViewById(R.id.period1);
            EditText etDuration2 = (EditText) findViewById(R.id.period2);
            str1 = etDuration1.getText().toString().trim();
            Spinner etDurationType = (Spinner) findViewById(R.id.period_type_cmp);

            String periodType = (String) etDurationType.getSelectedItem();
            builder.append("Duration " + str1 +' '+ periodType + '\n');

            TextView tvEmi1 = (TextView) findViewById(R.id.emi1);
            TextView tvEmi2 = (TextView) findViewById(R.id.emi2);
            str1 = tvEmi1.getText().toString();
            builder.append("Monthly Installment : " + str1 + '\n');

            TextView tvTotalpayment1 = (TextView) findViewById(R.id.total1);
            TextView tvTotalpayment2 = (TextView) findViewById(R.id.total2);
            str1 = tvTotalpayment1.getText().toString();
            builder.append("Total amount payable : " + str1 + '\n');

            TextView tvInterestPayable1 = (TextView) findViewById(R.id.interest1);
            TextView tvInterestPayable2 = (TextView) findViewById(R.id.interest2);
            str1 = tvInterestPayable1.getText().toString();
            builder.append("Interest payable : " + str1 + '\n');
            builder.append("----------------------------------------------------------------\n");
            builder.append("LOAN2:\n");

            String str2 = etLoanAmount2.getText().toString();
            builder.append("Loan Amount" + str2 + '\n');

            str2 = etRate2.getText().toString();
            builder.append("Rate " + str2 + '\n');
            str2 = etDuration2.getText().toString();
            builder.append("Duration " + str2 + ' ' + periodType + '\n');

            str2 = tvEmi2.getText().toString();
            builder.append("Monthly installment :" + str2 + '\n');
            str2 = tvTotalpayment2.getText().toString();
            builder.append("Total amount payable:" + str2 + '\n');
            str2 = tvInterestPayable2.getText().toString();
            builder.append("Interest Payable:" + str2 + '\n');

            String shareString = builder.toString();
            Intent intent = new Intent();
            intent.setAction(Intent.ACTION_SEND);
            intent.setType("text/plain");

            intent.putExtra(Intent.EXTRA_TEXT, shareString);
            startActivity(Intent.createChooser(intent, "Share via"));
        } else {

            EditText etLoanAmount = (EditText) findViewById(R.id.loanamount);
            String str = etLoanAmount.getText().toString().trim();
            Integer loanAmt = Integer.valueOf(str);
            str = String.format(Locale.getDefault(), "%,d", loanAmt);
            builder.append("Loan amount " + MyConstants.rupee + str + '\n');

            EditText etRate = (EditText) findViewById(R.id.rate);
            str = etRate.getText().toString().trim();
            builder.append("Rate " + str + "%\n");

            EditText etDuration = (EditText) findViewById(R.id.period);
            str = etDuration.getText().toString().trim();
            Spinner etDurationType = (Spinner) findViewById(R.id.period_type);

            String periodType = (String) etDurationType.getSelectedItem();
            builder.append("Duration " + str + ' ' + periodType + "\n ");

            TextView tvEmi = (TextView) findViewById(R.id.emi);
            str = tvEmi.getText().toString();

            builder.append(str);

            TextView tvTotalpayment = (TextView) findViewById(R.id.totalpayment);
            str = tvTotalpayment.getText().toString();
            builder.append('\n' + str);

            TextView tvInterestPayable = (TextView) findViewById(R.id.interest_payable);
            str = tvInterestPayable.getText().toString();
            builder.append('\n' + str);

            String shareString = builder.toString();

            Intent intent = new Intent();
            intent.setAction(Intent.ACTION_SEND);
            intent.setType("text/plain");

            intent.putExtra(Intent.EXTRA_TEXT, shareString);
            startActivity(Intent.createChooser(intent, "Share via"));
        }

    }

    @Override
    public boolean onPrepareOptionsMenu(Menu menu) {
        if(menu!=null) {
            MenuItem item = menu.getItem(0);
            if (item != null) {
                if (mCompareEnabled) {
                    item.setTitle("Single");
                } else {
                    item.setTitle("Compare");
                }
            }
        }
         return true;
    }

    private void showCompareLayout() {
        ViewSwitcher switcher = (ViewSwitcher) findViewById(R.id.switcher);
        invalidateOptionsMenu();
        if(mCompareEnabled){
            switcher.showPrevious();
            mCompareEnabled = false;
            return;

        }
        boolean hasPrevValues = true;
        try {
            storeFieldValues();
            calculate();
        }catch (NumberFormatException e){
           hasPrevValues = false;
        }
        switcher.showNext();

        EditText etLoanAmount1 = (EditText)findViewById(R.id.loanamount1);
        etLoanAmount1.addTextChangedListener(this);
        if(hasPrevValues) {
            etLoanAmount1.setText(String.valueOf(mLoanAmount));
        }

        EditText etLoanAmount2 = (EditText)findViewById(R.id.loanamount2);
        etLoanAmount2.addTextChangedListener(this);
        if(hasPrevValues) {
            etLoanAmount2.addTextChangedListener(this);
        }

        EditText etRate1 = (EditText) findViewById(R.id.rate1);
        etRate1.addTextChangedListener(this);
        if(hasPrevValues) {
            etRate1.setText(String.valueOf(mRate));
        }

        EditText etRate2 = (EditText) findViewById(R.id.rate2);
        etRate2.addTextChangedListener(this);
        if(hasPrevValues) {
            etRate2.addTextChangedListener(this);
        }

        EditText etDuration1 = (EditText) findViewById(R.id.period1);
        etDuration1.addTextChangedListener(this);
        if(hasPrevValues) {
            etDuration1.setText(String.valueOf(mPeriod));
        }

        EditText etDuration2 = (EditText) findViewById(R.id.period2);
        etDuration2.addTextChangedListener(this);
        if(hasPrevValues) {
            etDuration2.addTextChangedListener(this);
        }

        Spinner durationType = (Spinner)findViewById(R.id.period_type_cmp);
        durationType.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                calculate();
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        });

        if(hasPrevValues) {
            if (mPeriodType.equals("Years")) {
                durationType.setSelection(0);
            } else {
                durationType.setSelection(1);
            }
        }

        mCompareEnabled = true;
        Button btnCalculate = findViewById(R.id.calculate_compare);
        btnCalculate.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                calculate();
            }
        });
      //  calculate();

    }

    private void storeFieldValues() throws NumberFormatException {
        EditText etLoanAmount = (EditText) findViewById(R.id.loanamount);
        String str = etLoanAmount.getText().toString().trim();
        mLoanAmount = Integer.valueOf(str);

        EditText etRate = (EditText) findViewById(R.id.rate);
        str = etRate.getText().toString().trim();
        mRate = Double.valueOf(str);

        EditText etDuration = (EditText) findViewById(R.id.period);
        str = etDuration.getText().toString().trim();
        mPeriod = Integer.valueOf(str);
        Spinner etDurationType = (Spinner) findViewById(R.id.period_type_cmp);

        mPeriodType= (String) etDurationType.getSelectedItem();

    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_calculate_emi3);

        Toolbar toolbar = findViewById(R.id.toolbar);
        setActionBar(toolbar);
        ActionBar ab = getActionBar();
        if(ab!=null) {
            ab.setDisplayShowHomeEnabled(true);
            ab.setDisplayHomeAsUpEnabled(true);
            ab.setTitle("Calculate EMI");
        }



        EditText etLoanAmount = (EditText)findViewById(R.id.loanamount);
        etLoanAmount.addTextChangedListener(this);

        EditText etRate = (EditText) findViewById(R.id.rate);
        etRate.addTextChangedListener(this);

        EditText etDuration = (EditText) findViewById(R.id.period);
        etDuration.addTextChangedListener(this);

         paymentDetails = findViewById(R.id.pmtdetails);
        paymentDetails.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                showAmortizationTable();
            }
        });
        paymentDetails.setVisibility(View.INVISIBLE);



        Button btnCalculate = findViewById(R.id.calculate);
        btnCalculate.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                calculate();
                InputMethodManager imm = (InputMethodManager) CalculateEMI.this.getSystemService(Activity.INPUT_METHOD_SERVICE);
                imm.hideSoftInputFromWindow(view.getWindowToken(),0);
            }
        });

        setPeriodSpinner();
        resLayout = findViewById(R.id.results);
        if(resLayout!=null){
            resLayout.setVisibility(View.INVISIBLE);
        }


    }

    private void setPeriodSpinner() {
        Spinner spinner = (Spinner) findViewById(R.id.period_type);
        /*;ArrayAdapter.createFromResource(this, *//**//*R.array.period_type*//**//*period_types,
                R.layout.spinner_item);*/
        spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                calculate();
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        });


    }

    boolean calculate() {
        boolean validData = true;boolean validData2 = true;
        boolean showError = false;//TODO do we change it any time?
        int loanAmount=0,downPmt=0,duration=0;
        double rate=0;
        if(mCompareEnabled){
            try {
                int loanAmount1 = 0, loanAmount2 = 0;
                double rate1 = 0, rate2 = 0;
                int period1 = 0, period2 = 0;
                double emi1, emi2, totalamt1, totalamt2, interest1, interest2;

                EditText etLoanAmount1 = (EditText) findViewById(R.id.loanamount1);
                EditText etLoanAmount2 = (EditText) findViewById(R.id.loanamount2);
                String str1 = etLoanAmount1.getText().toString().trim();
                if (str1.isEmpty()) {
                    validData = false;
                } else {
                    loanAmount1 = Integer.valueOf(str1);
                    if (loanAmount1 == 0) {
                      //  if (showError) {
                            etLoanAmount1.setError("Loan amount can not be zero");
                     //   }
                        validData = false;
                    }
                }

                String str2 = etLoanAmount2.getText().toString().trim();
                if (str2.isEmpty()) {
                    validData2 = false;
                } else {
                    loanAmount2 = Integer.valueOf(str2);
                    if (loanAmount2 == 0) {
                      //  if (showError) {
                            etLoanAmount2.setError("Loan amount can not be zero");
                     //   }
                        validData2 = false;
                    }
                }

                EditText etRate1 = (EditText) findViewById(R.id.rate1);
                EditText etRate2 = (EditText) findViewById(R.id.rate2);
                String str = etRate1.getText().toString().trim();
                if (TextUtils.isEmpty(str)) {
                    validData = false;
                } else {
                    rate1 = Double.valueOf(str);
                    if (rate1 == 0||rate1>=100) {
                       // if (showError) {
                            etRate1.setError("Interest rate can not be "+str);
                 //       }
                        validData = false;
                    }
                }

                str = etRate2.getText().toString().trim();
                if (TextUtils.isEmpty(str)) {
                    validData2 = false;
                } else {
                    rate2 = Double.valueOf(str);
                    if (rate2 == 0|| rate2>=100) {
                //        if (showError) {
                            etRate2.setError("Interest rate can not be "+str);
              //          }
                        validData2 = false;
                    }
                }
                Spinner spPeriod = (Spinner) findViewById(R.id.period_type_cmp);
                String per = (String) spPeriod.getSelectedItem();

                EditText etPeriod1 = (EditText) findViewById(R.id.period1);
                EditText etPeriod2 = (EditText) findViewById(R.id.period2);
                str = etPeriod1.getText().toString().trim();
                if (TextUtils.isEmpty(str)) {
                    validData = false;
                } else {
                    period1 = Integer.valueOf(str);
                    if (period1 == 0) {
                      //  if (showError) {
                            etPeriod2.setError("Period can not be zero");
                   //     }
                        validData = false;
                    }else if(per.equals("Years")&&period1>99){
                        etPeriod1.setError("Period can not be greater than 99");
                        validData = false;
                    }
                }

                str = etPeriod2.getText().toString().trim();
                if (TextUtils.isEmpty(str)) {
                    validData2 = false;
                } else {
                    period2 = Integer.valueOf(str);
                    if (period2 == 0) {
                     //   if (showError) {
                            etPeriod2.setError("Period   can not be zero");
                //        }
                        validData2 = false;
                    }else if(per.equals("Years")&&period2>99){
                        etPeriod1.setError("Period can not be greater than 99");
                    }
                }

                if (per.contains("Years")) {
                    period1 = period1 * 12;
                    period2 = period2 * 12;

                }

                if (validData) {
                    resLayout.setVisibility(View.VISIBLE);
                    double interestRate1 = rate1 / 1200;
                    double t1 = Math.pow(1 + interestRate1, period1);

                    double emiValue1 = loanAmount1 * interestRate1 * t1 / (t1 - 1);
                    TextView tvEmi = (TextView) findViewById(R.id.emi1);
                    tvEmi.setText( MyConstants.rupee+String.format("%,.2f", emiValue1));

                    double totalPayment1 = emiValue1 * period1;
                    double interestPayable1 = totalPayment1 - loanAmount1;

                    TextView tvTotalpayment1 = (TextView) findViewById(R.id.total1);
                    String totStr = MyMethods.formatDouble(totalPayment1);
                    tvTotalpayment1.setText(totStr);//MyConstants.rupee+  String.format("%,.2f", totalPayment1));

                    TextView tvInterestPayable1 = (TextView) findViewById(R.id.interest1);
                    String intStr = MyMethods.formatDouble(interestPayable1);
                    tvInterestPayable1.setText(intStr);//MyConstants.rupee+  String.format("%,.2f", interestPayable1));
                }
                if(validData2) {
                    double interestRate2 = rate2 / 1200;
                    double t2 = Math.pow(1 + interestRate2, period2);
                    double emiValue2 = loanAmount2 * interestRate2 * t2 / (t2 - 1);
                    TextView tvEmi2 = (TextView) findViewById(R.id.emi2);
                    tvEmi2.setText(MyConstants.rupee+String.format("%,.2f", emiValue2)  );

                    double totalPayment2 = emiValue2 * period2;
                    double interestPayable2 = totalPayment2 - loanAmount2;

                    TextView tvTotalpayment2 = (TextView) findViewById(R.id.total2);
                    String totStr = MyMethods.formatDouble(totalPayment2);
                    tvTotalpayment2.setText(totStr);//.rupee+String.format("%,.2f", totalPayment2) );

                    TextView tvInterestPayable2 = (TextView) findViewById(R.id.interest2);
                    String intStr = MyMethods.formatDouble(interestPayable2);
                    tvInterestPayable2.setText(intStr);
                      //      MyConstants.rupee+String.format("%,.2f", interestPayable2) );
                }
                return validData;
            }catch(NumberFormatException e){
                Toast.makeText(this,"Number improper",Toast.LENGTH_SHORT).show();
                return validData;
            }

        }else {//single loan - no compare
            resLayout.setVisibility(View.VISIBLE);
            paymentDetails.setVisibility(View.VISIBLE);
            try {
                EditText etLoanAmount = (EditText) findViewById(R.id.loanamount);
                String str = etLoanAmount.getText().toString().trim();
                if (TextUtils.isEmpty(str)) {
                    validData = false;
                } else {
                    loanAmount = Integer.valueOf(str);
                    if (loanAmount == 0) {
                  //      if (showError) {
                            etLoanAmount.setError("Loan amount can not be zero");
                    //    }
                        validData = false;
                    }
                }


                EditText etRate = (EditText) findViewById(R.id.rate);
                str = etRate.getText().toString().trim();
                if (TextUtils.isEmpty(str)) {
                    validData = false;
                } else {

                    rate = Double.valueOf(str);
                    if (rate <= 0 || rate >= 100) {
                 //       if (showError) {
                            etRate.setError("Interest rate can not be " + rate);
                 //       }
                        validData = false;
                    }
                }
                Spinner etDurationType = (Spinner) findViewById(R.id.period_type);
                String periodType = (String) etDurationType.getSelectedItem();
                EditText etDuration = (EditText) findViewById(R.id.period);
                str = etDuration.getText().toString().trim();
                if (TextUtils.isEmpty(str)) {
                    validData = false;
                } else {
                    duration = Integer.valueOf(str);
                    if (duration <= 0) {
            //            if (showError) {
                            etDuration.setError("Duration can not be " + str);
            //            }
                        validData = false;
                    }else if(periodType.equals("Years")&&duration>99){
                        validData = false;
                        etDuration.setError("Duration can not be greater than 99");
                    }
                }

                double durationInMonths = duration;
                if (periodType.equals(MyConstants.P_DAYS)) {
                    durationInMonths = duration / 30.0;
                } else if (periodType.equals(MyConstants.P_YEARS)) {
                    durationInMonths = duration * 12;
                }

                if (durationInMonths < 1) {
                    validData = false;
                }
                int loanAmount2 = 0, duration2 = 0;
                double rate2 = 0;
                double durationInMonths2 = 0;

                //   int durationInMonths = duration * 12;
                if (validData) {
                    double netAmt = loanAmount; /*- downPmt;*/
                    double interestRate = rate / 1200;
                    double t = Math.pow(1 + interestRate, durationInMonths);
                    double emiValue = netAmt * interestRate * t / (t - 1);
                    TextView tvEmi = (TextView) findViewById(R.id.emi);
                    tvEmi.setText("Monthly installment:  " + MyConstants.rupee+ String.format("%,.2f", emiValue) );

                    double totalPayment = emiValue * durationInMonths;
                    double interestPayable = totalPayment - netAmt;
                    String strTotal = MyMethods.formatDouble(totalPayment);
                    String strInt = MyMethods.formatDouble(interestPayable);
                    TextView tvTotalpayment = (TextView) findViewById(R.id.totalpayment);

                    tvTotalpayment.setText("Total Payment: "
                            +strTotal);
                          //  + MyConstants.rupee+ String.format("%,.2f", totalPayment) );

                    TextView tvLoanAmount = (TextView)findViewById(R.id.loanamountre) ;
                    String strLoan = "Loan amount: " + MyMethods.formatDouble(netAmt);
                    tvLoanAmount.setText(strLoan);
                    TextView tvInterestPayable = (TextView) findViewById(R.id.interest_payable);
                    tvInterestPayable.setText("Total interest payable (Total payment - Loan)) : "
                            +strInt);

                    return true;

                } else {
                    return false;
                }
            } catch (NumberFormatException e) {
                Toast.makeText(this, "Error. Number format exception ", Toast.LENGTH_SHORT).show();
                return false;
            }
        }
    }

    @Override
    public void beforeTextChanged(CharSequence s, int start, int count, int after) {

    }

    @Override
    public void onTextChanged(CharSequence s, int start, int before, int count) {


    }

    @Override
    public void afterTextChanged(Editable s) {
        calculate();
    }

    void showAmortizationTable() {


        EditText etLoanAmount = findViewById(R.id.loanamount);
        String str = etLoanAmount.getText().toString() ;
        mLoanAmount = Integer.valueOf(str);
        // int downPmt = Integer.valueOf(strDn);
        int loanAmt = mLoanAmount; // - downPmt;
        EditText etPeriod = findViewById(R.id.period) ;
        str = etPeriod.getText().toString();
        int period = Integer.valueOf(str);
        Spinner spPeriodType = findViewById(R.id.period_type);
        String str2 = (String) spPeriodType.getSelectedItem();
        if ((str2.equals( MyConstants.P_YEARS))) {
            period = period * 12;
        }
        mPeriod = period;
        EditText etRate = findViewById(R.id.rate) ;
        str = etRate.getText().toString();
        double rate = java.lang.Double.valueOf(str);
        rate = rate / 1200 ;//we should consider monthly interest rate and not percent

        double netAmt = mLoanAmount; /*- downPmt;*/
        double interestRate = rate / 1200;
        double t = Math.pow(1 + interestRate, period);
        double emiValue = netAmt * interestRate * t / (t - 1);

        //mRate = rate;
        int listLength = period ;//it is period in months
        double principal =(double) loanAmt;
        ArrayList<AmortItem> amortList = new ArrayList<>();
        for (int i =0;i<listLength;i++) {
            AmortItem item = new AmortItem();
            double interestPart = principal * rate ;//period is one month
            double principalPart = emiValue - interestPart;
            item.interestPart = interestPart;
            item.principalPart = principalPart;
            item.month = i + 1;
            item.principalRemaining = principal - principalPart;
            principal = item.principalRemaining;
            amortList.add(item);
        }
        Dialog  d =new Dialog(this);
        d.setContentView(R.layout.amort_list_dialog);
        ListView lv = d.findViewById(R.id.amortlist) ;
        lv.setAdapter( new MyAmortAdapter(this, amortList, emiValue));
        View  headerView = getLayoutInflater().inflate(R.layout.emi_header, lv, false);
        lv.addHeaderView(headerView);
        d.show();
         Button btnOk = d.findViewById(R.id.ok_button) ;
         btnOk.setOnClickListener(new View.OnClickListener() {
             @Override
             public void onClick(View view) {
                 d.dismiss();
             }
         });
        //btnOk.setOnClickListener(MyOnClickListener(d))
      /*  try {
            Calendar today = Calendar.getInstance();
            EditText etDate = findViewById(R.id.date);
            val strLoanDate: String = etDate.getText().toString()
            val format = SimpleDateFormat("dd-MMM-yyyy")
            val dt = format.parse(strLoanDate)

            //  String arr[] = strLoanDate.split("/");
            val loanDate = Calendar.getInstance()
            loanDate.time = dt
            *//*
            val diffInDays = differenceInDays(today, loanDate)
            val diffInMonths = diffInDays / 30
            if (diffInMonths <= listLength) {
                if (diffInDays > 30) {
                    val outStandingLoan = amortList[diffInDays / 30].principalRemaining
                    val tvOutLoan: TextView = d.findViewById<View>(R.id.outloan) as TextView
                    val str3 = "Loan remaining:" + String.format("%15.2f", outStandingLoan)
                    tvOutLoan.setVisibility(View.VISIBLE)
                    tvOutLoan.setText(str3)
                } else {
                    val layout: LinearLayout = findViewById(R.id.outstandinglayout) as LinearLayout
                    layout.setVisibility(View.GONE)
                }
            }
            d.show()
        } catch (e: ParseException) {
            Log.d("Savingsapp", (e.message)!!)
        }*/
    }
}
