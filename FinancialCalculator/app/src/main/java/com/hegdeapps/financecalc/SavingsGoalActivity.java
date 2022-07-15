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
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;
import android.widget.Toolbar;


public class SavingsGoalActivity extends Activity implements  TextWatcher {

    private String mShareText="";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_savings_goal);

        Toolbar toolbar = (Toolbar)findViewById(R.id.toolbar);
        if(toolbar!=null){
            toolbar.setTitle("Savings Goal");
            setActionBar(toolbar);
            ActionBar ab = getActionBar();
            ab.setDisplayShowHomeEnabled(true);
            ab.setDisplayHomeAsUpEnabled(true);
        }


        EditText etFinalAmount = (EditText)findViewById(R.id.finalamount);
        etFinalAmount.addTextChangedListener(this);//setOnEditorActionListener(this);


        EditText etPeriod = (EditText)findViewById(R.id.period);
        etPeriod.addTextChangedListener(this);

        EditText etRate = (EditText)findViewById(R.id.rate);
        etRate.addTextChangedListener(this);

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
        boolean v =  calculateAndPrint();
        if(v) {
            Intent intent = new Intent();
            intent.setAction(Intent.ACTION_SEND);
            intent.setType("text/plain");
            intent.putExtra(Intent.EXTRA_TEXT, mShareText);
            startActivity(Intent.createChooser(intent, "Share via"));
        }else{
            LinearLayout parentlayout = (LinearLayout)findViewById(R.id.parentlayout);
            Toast.makeText(this,"Please enter values for calculation",Toast.LENGTH_SHORT).show();
        }

    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.sharemenu,menu);
        return true;
    }

    private boolean calculateAndPrint() {
        EditText etFinalAmount,etPeriod,etRate;
        etFinalAmount = (EditText)findViewById(R.id.finalamount);
        etPeriod = (EditText)findViewById(R.id.period);
        etRate = (EditText)findViewById(R.id.rate);
        EditText etStartingBalance = (EditText)findViewById(R.id.stBalance);
        boolean valid = true;

        String strFinalAmt = etFinalAmount.getText().toString().trim();


        String strPeriod = etPeriod.getText().toString().trim();

        String strRate = etRate.getText().toString().trim();
        boolean invalidData = false;


            double finalAmount, rate;
            int period;
            if(TextUtils.isEmpty(strFinalAmt)) {
                valid = false;
                return false;
            }
                    finalAmount = Double.valueOf(strFinalAmt);

            if (finalAmount <= 0) {
                valid  = false;
                etFinalAmount.setError("Amount can not be zero");
            }
            if(TextUtils.isEmpty(strPeriod)) {
                valid = false;
                return false;
            }
            period = Integer.valueOf(strPeriod);
            if (period < 1) {
                valid = true;
                etPeriod.setError("Period can not be zero");
            }
            if(TextUtils.isEmpty(strRate)) {
                 valid = false;
                 return false;
            }
           rate = Double.valueOf(strRate);
            if (rate <= 0||rate>99) {
                invalidData = true;
                etRate.setError("Invalid interest rate.");
            }

            double startingBalance = Double.valueOf(etStartingBalance.getText().toString());
/*
THis formula from a website. Gives correct answer
But I think for monthly compounding
            rate = rate/1200;
            //TODO consider initial amount

            //TODO verify with annual and monthly rates

            double ans =  finalAmount *rate/(Math.pow(1+rate,period*12)-1);*/
            if(valid) {
                double qtrRate = rate/400;

                double initialAmtCompounded = startingBalance *(Math.pow((1+qtrRate), period*4));
                finalAmount -=initialAmtCompounded;
                TextView tvAns = (TextView)findViewById(R.id.savinggoal);
                //TextView tvLabel = (TextView)findViewById(R.id.ansLabel);
                if(finalAmount<=0){
                    //tvAns.setText(MyConstants.rupee+"0 ");
                  tvAns.setText(" 0 per month. Because your starting balance will grow into "+strFinalAmt+" in "+strPeriod+" years");
                    String title = "Savings Goal Calculator \n" +
                            "------------------------------------------------------\n";
                    mShareText = title + "Total amount to be available : " + MyConstants.rupee+strFinalAmt + '\n' +
                            "Starting balance :"+etStartingBalance.getText().toString()+
                            "\nSaving period : " + period + '\n' + "\nRate of Interest : "
                            + String.format("%.2f", rate) + '%' +
                            "\n\nMonthly saving should be = 0 ";
                    return true;
                }else {
                    //tvLabel.setText(" per month to reach your goal.");

                    double nr1 = 1 - Math.pow(1 + qtrRate, -1.0 / 3);

                    double ans = finalAmount * nr1 / (Math.pow(1 + qtrRate, period * 4) - 1);

                    //formula is ulta of RD formula.

                    String strAns = MyMethods.formatDouble(ans);
                    tvAns.setText("Monthly savings :"+strAns);
                    String title = "Savings Goal Calculator \n" +
                            "------------------------------------------------------\n";
                    mShareText = title + "Total amount to be available : " +MyConstants.rupee+ strFinalAmt + '\n' +

                            "Starting balance :"+MyConstants.rupee+etStartingBalance.getText().toString()+
                            "\nSaving period : " + period +"\nRate of Interest : "
                            + String.format("%.2f", rate) + '%' +
                            "\n\nMonthly saving should be = " + strAns;
                    return true;
                }
            }else{
                return false;
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
        String str = s.toString().trim();
        if(!TextUtils.isEmpty(str)) {
            calculateAndPrint();
        }
        }
    }

