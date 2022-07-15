package com.hegdeapps.financecalc;

import android.app.ActionBar;
import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextUtils;
import android.text.TextWatcher;
import android.util.Log;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;
import android.widget.Toolbar;


/**
 * Created by usha on 24/3/17.
 */

public class LoanAffordability extends Activity implements TextWatcher {
    String mType;
    private String mShareText = "";

    @Override
    protected void onCreate( Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.loan_afford);

        Intent intent = getIntent();
        mType = intent.getStringExtra(MyConstants.INTEREST_TYPE);

        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        if (toolbar != null) {
            toolbar.setTitle("Loan Affordability");
            setActionBar(toolbar);
            ActionBar ab = getActionBar();
            ab.setDisplayShowHomeEnabled(true);
            ab.setDisplayHomeAsUpEnabled(true);
        }
        //setPeriodSpinner();

        EditText etEmi, etRate, etPeriod;
        etEmi = (EditText) findViewById(R.id.emi);
        etPeriod = (EditText) findViewById(R.id.period);
        etRate = (EditText) findViewById(R.id.rate);
        etEmi.addTextChangedListener(this);
        etPeriod.addTextChangedListener(this);
        etRate.addTextChangedListener(this);



    }

    private boolean calculate(boolean showError) throws NumberFormatException {

        //TOD where do you say compounded quarterly
        boolean invalidData = false;
        EditText etEmi = (EditText) findViewById(R.id.emi);
        String emiStr = etEmi.getText().toString().trim();

        try {
            if (TextUtils.isEmpty(emiStr)) {
                if (showError) {
                    etEmi.setError("Please enter valid amount");
                }
                invalidData = true;
            }else{
                if(Double.valueOf(emiStr)<=0){
                    etEmi.setError("Please enter a value greater than 0");
                    invalidData = true;
                }
            }

            EditText etPeriod = (EditText) findViewById(R.id.period);
            String period = etPeriod.getText().toString();
            period = period.trim();

            if ( TextUtils.isEmpty(period)  ) {
                if (showError) {
                    etPeriod.setError("Please enter valid time period in years");
                }
                invalidData = true;
            }else{
                if(Integer.valueOf(period)<=0){
                    etPeriod.setError("Loan term can not be zero");
                    invalidData = true;
                }
            }

           int nYears = Integer.valueOf(period);
           double  n = nYears * 12;//no of monthly installments


            EditText etRate = (EditText) findViewById(R.id.rate);
            String rate = etRate.getText().toString();
            rate = rate.trim();
            if ( TextUtils.isEmpty(rate)  ) {
                if (showError) {
                    etRate.setError("Please enter valid interest rate");
                }
                invalidData = true;
            }else{
                if(Double.valueOf(rate)<=0){
                    etRate.setError("Interest rate can not be zero");
                    invalidData = true;
                }
                if(Double.valueOf(rate)>=100){
                    etRate.setError("Interest rate can not be greater than 99");
                    invalidData = true;
                }
            }

           if (invalidData) {
               // Toast.makeText(this, "Please enter values for all fields..", Toast.LENGTH_SHORT).show();
                return false;
            }

            double emi = Double.valueOf(emiStr);
            // int t = Integer.valueOf(period);
            double r = Double.valueOf(rate) / 1200;


            double interest = 0;

            double pw = Math.pow(1 + r, n);
            double p =( emi *(pw-1) /r )/pw;

            String strAns = MyMethods.formatDouble(p);


            TextView tvAns = (TextView) findViewById(R.id.ans);
            String strInt = "Maximum Loan you can get is  : " + MyConstants.rupee + String.format("%,.2f", p);
            tvAns.setText("Eligible Loan Amount : "+strAns);//strInt);
            mShareText = "EMI : " + MyConstants.rupee + String.format("%,.2f", emi) + '\n' +
                    "Rate : " + String.format("%,.2f", (r*1200)) + '%' + '\n' +
                    "Period : " + String.format("%d",(nYears)) + " Years" + '\n';

            mShareText = "Loan Affordability Calculations\n" +
                    "----------------------------------------------\n" + mShareText + "\nEligible loan amount  = ";

            mShareText = mShareText +MyMethods.formatDouble( p);

        } catch (NumberFormatException e) {
            Log.d("Savings", "Number format exception in simple interest calculation");
            return false;
            //   Toast.makeText(this, "Number format exception in simple interest calculation",Toast.LENGTH_SHORT).show();
        }
        return true;

    }


    @Override
    public void beforeTextChanged(CharSequence s, int start, int count, int after) {

    }

    @Override
    public void onTextChanged(CharSequence s, int start, int before, int count) {

    }

    @Override
    public void afterTextChanged(Editable s) {
        calculate(false);
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        int id = item.getItemId();
        if (id == R.id.share) {
            shareCalculations();
        }
        return false;
    }

    private void shareCalculations() {
        if(calculate(true)) {
            Intent intent = new Intent();
            intent.setAction(Intent.ACTION_SEND);
            intent.setType("text/plain");
            intent.putExtra(Intent.EXTRA_TEXT, mShareText);
            startActivity(Intent.createChooser(intent, "Share via"));
        }else{
            LinearLayout layout =(LinearLayout) findViewById(R.id.parentlayout);
            Toast.makeText(this,"Please fill in Basic, DA and years of service for calculation..", Toast.LENGTH_SHORT).show();
        }

    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.sharemenu, menu);
        return true;
    }
}
