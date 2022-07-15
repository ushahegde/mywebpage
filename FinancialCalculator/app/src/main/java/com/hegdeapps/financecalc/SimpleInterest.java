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
import android.widget.AdapterView;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;
import android.widget.Toolbar;

/**
 * Created by usha on 24/3/17.
 */

public class SimpleInterest extends Activity implements TextWatcher {
    String mType;
    private String mShareText="";

    @Override
    protected void onCreate( Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.simpleinterest);

        Intent intent = getIntent();
        mType = intent.getStringExtra(MyConstants.INTEREST_TYPE);

        Toolbar toolbar = (Toolbar)findViewById(R.id.toolbar);
        if(toolbar!=null){
            if(mType.equals(MyConstants.SIMPLE)){
                toolbar.setTitle("Simple Interest");
            }else {
                toolbar.setTitle("Compound Interest");
            }
            setActionBar(toolbar);
            ActionBar ab = getActionBar();
            ab.setDisplayShowHomeEnabled(true);
            ab.setDisplayHomeAsUpEnabled(true);
        }
        setPeriodSpinner();

        EditText etAmount,etRate, etPeriod;
        etAmount = (EditText)findViewById(R.id.amt);
        etPeriod = (EditText)findViewById(R.id.rate);
        etRate = (EditText)findViewById(R.id.period);
        etAmount.addTextChangedListener(this);
        etPeriod.addTextChangedListener(this);
        etRate.addTextChangedListener(this);

        //TextView tvTitle = (TextView) findViewById(R.id.title);

    }

    void calculateInterest(boolean showError) throws NumberFormatException {

        //TOD where do you say compounded quarterly
        boolean invalidData = false;
        EditText etAmt = (EditText)findViewById(R.id.amt);
        String amt = etAmt.getText().toString();
        amt = amt.trim();

            if (TextUtils.isEmpty(amt) ) {
                if(showError) {
                    etAmt.setError("Please enter valid amount");
                }
                invalidData = true;
            }else{
                if( (Double.valueOf(amt) <= 0)  ){
                    etAmt.setError("Please enter valid amount grater than 0");
                    invalidData = true;
                }
            }

            EditText etPeriod = (EditText) findViewById(R.id.period);
            String period = etPeriod.getText().toString();
            period = period.trim();

            if (TextUtils.isEmpty(period)){
                invalidData = true;
            }else{
                if( (Integer.valueOf(period) <= 0)){
                    etPeriod.setError("Please enter  time period greater than 0");
                    invalidData = true;
                }
            }
            double periodValue = 0.0;
           if(!invalidData)   periodValue = Double.valueOf(period);

          Spinner spPeriodType = (Spinner)findViewById(R.id.period_type_cmp);
            String strPeriodType = (String)spPeriodType.getSelectedItem();
            if(strPeriodType.equals(MyConstants.P_DAYS)){
                periodValue = periodValue/365;
            }else if(strPeriodType.equals(MyConstants.P_MONTHS)){
                periodValue = periodValue/12;
            }

            EditText etRate = (EditText) findViewById(R.id.rate);
            String rate = etRate.getText().toString();
            rate = rate.trim();
            if (TextUtils.isEmpty(rate)) {
                if(showError) {
                    etRate.setError("Please enter valid interest rate");
                }
                invalidData = true;
            }else if((Double.valueOf(rate) <= 0)||(Double.valueOf(rate) >99)){
                etRate.setError("Invalid interest rate. Try again");
                invalidData = true;
            }

           if(!invalidData){

            double p = Double.valueOf(amt);
           // int t = Integer.valueOf(period);
            double r = Double.valueOf(rate);


            double interest=0;

            if(mType.equals(MyConstants.SIMPLE)) {

                interest = p * periodValue * r / 100;

            }else if(mType.equals(MyConstants.COMPOUND)){
                double ratePerQuarter = r/400;
                double numPeriods = periodValue*4;
                double a = p*Math.pow(1+ratePerQuarter,numPeriods);
                interest = a - p;

            }

            TextView tvSI = (TextView)findViewById(R.id.simpleint);
            String strInt = "Interest : "+ MyMethods.formatDouble(interest);
            tvSI.setText(strInt);
            mShareText = "Amount : "+ MyConstants.rupee+String.format("%,.2f",p)+ '\n' +
                    "Rate : "+String.format("%,.2f",r)+ '%' + '\n' +
                    "Period : "+periodValue+ ' ' +strPeriodType+ '\n';
            if(mType.equals(MyConstants.SIMPLE)){
                mShareText = "Simple Interest Calculations\n"+
                              "----------------------------------------------\n"+ mShareText+"\nSimple Interest = ";
            }
            else{
                mShareText =  "Compound Interest Calculations\n"+
                               "---------------------------------------------\n"+ mShareText+"\nCompound Interest = ";
            }
            mShareText = mShareText+ strInt;

        }else{
               mShareText ="NotValid";
           }
    }

    private void setPeriodSpinner() {
        Spinner spinner = (Spinner) findViewById(R.id.period_type_cmp);
        //String durationType[] = {"Days","Months","Years"};


        spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                String selPeriodType = getResources().getStringArray(R.array.period_type)[position];
              //  mPeriodType = selPeriodType;
                try {
                    calculateInterest(false);
                } catch (NumberFormatException e) {
                   // Toast.makeText(EMIActivity.this, "Invalid number", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {
               // mPeriodType = getResources().getStringArray(R.array.period_type)[0];

            }
        });




    }

    @Override
    public void beforeTextChanged(CharSequence s, int start, int count, int after) {

    }

    @Override
    public void onTextChanged(CharSequence s, int start, int before, int count) {

    }

    @Override
    public void afterTextChanged(Editable s) {
        calculateInterest(false);
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        int id = item.getItemId();
        if (id == R.id.share) {
            shareCalculations();
        }
        return  false;
    }

    private void shareCalculations() {
        calculateInterest(true);
        if(mShareText.equals("NotValid")){
            Toast.makeText(this,"Fill in details before sharing...",Toast.LENGTH_SHORT).show();
        }else {
            Intent intent = new Intent();
            intent.setAction(Intent.ACTION_SEND);
            intent.setType("text/plain");
            intent.putExtra(Intent.EXTRA_TEXT, mShareText);
            startActivity(Intent.createChooser(intent, "Share via"));
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.sharemenu,menu);
        return true;
    }
}
