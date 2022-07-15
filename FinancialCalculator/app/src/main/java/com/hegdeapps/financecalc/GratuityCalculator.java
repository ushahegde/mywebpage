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

public class GratuityCalculator extends Activity implements TextWatcher {

    private String mShareText="";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_gratuity_calculator);

        Toolbar toolbar = (Toolbar)findViewById(R.id.toolbar);
        if(toolbar!=null){
            toolbar.setTitle("Gratuity");
            setActionBar(toolbar);
            ActionBar ab = getActionBar();
            ab.setDisplayShowHomeEnabled(true);
            ab.setDisplayHomeAsUpEnabled(true);
        }


        EditText etMonthlySal,etYears,etMonths;
        etMonthlySal = (EditText)findViewById(R.id.basic);
      //  etDA = (EditText)findViewById(R.id.da);
        etYears = (EditText)findViewById(R.id.years);
        etMonths = (EditText)findViewById(R.id.months);

        etMonthlySal.addTextChangedListener(this);
       // etDA.addTextChangedListener(this);
        etYears.addTextChangedListener(this);
        etMonths.addTextChangedListener(this);


    }

    private boolean calculate_gratuity_amount() {
        boolean validData = true;
        double salary=0, da=0, years=0;
        try {
            EditText etMontlySalary = (EditText) findViewById(R.id.basic);
            String str = etMontlySalary.getText().toString().trim();
            if (TextUtils.isEmpty(str)) {
                //etBasic.setError("Basic pay can not be empty!");
                validData = false;
            } else {
                salary = Double.valueOf(str);
                if (salary == 0) {
                    etMontlySalary.setError("Basic pay can not be zero");
                    validData = false;
                }
            }


            EditText etYears = (EditText) findViewById(R.id.years);
            str = etYears.getText().toString().trim();
            if (TextUtils.isEmpty(str)) {
            //    etYears.setError("Years of service can not be empty!");
                validData = false;
            } else {
                years = Double.valueOf(str);
                if (years <= 0) {
                   etYears.setError("Years of service can not be " + str);
                    validData = false;
                }else if(years<5){
                    etYears.setError("Years of service should be minimum 5  to be eligible for gratuity");
                    validData = false;
                }
            }
            EditText etMonths = (EditText) findViewById(R.id.months);
            str = etMonths.getText().toString().trim();
            double months=0;
            if (!TextUtils.isEmpty(str)) {
                months = Double.valueOf(str);
                if(months>=12){
                    etMonths.setError("Months can not be greater than 11");
                    validData = false;
                }else {
                    years += months / 12;
                }
            }




            if(validData){
                double gratuity = (salary)*15*years/26;
                String formattedAnswer = MyMethods.formatDouble(gratuity);
                TextView tvGratuity = (TextView)findViewById(R.id.gratuity_amount);
                tvGratuity.setText( "Gratuity Amount :"+ formattedAnswer);//MyConstants.rupee+String.format("%,.2f",gratuity));
                mShareText = "Gratuity Calculations \n-----------------------------------------\n"
                        +"Basic +DA :"+MyConstants.rupee+String.format("%,.2f",salary)+

                        "\nYears of Service:"+years+
                        "\n\nGratuity Amount ="+MyMethods.formatDouble(gratuity);
            }

        } catch (NumberFormatException e) {
            Toast.makeText(this, "Error. Number format exception ", Toast.LENGTH_SHORT).show();
        }
        return validData;
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
    //    if(!TextUtils.isEmpty(str)){
            calculate_gratuity_amount();
       // }

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
        boolean valid =  calculate_gratuity_amount();
        if(valid) {
            Intent intent = new Intent();
            intent.setAction(Intent.ACTION_SEND);
            intent.setType("text/plain");
            intent.putExtra(Intent.EXTRA_TEXT, mShareText);
            startActivity(Intent.createChooser(intent, "Share via"));
        }else{
             LinearLayout layout =(LinearLayout) findViewById(R.id.parentlayout);
              Toast.makeText(this,"Please fill in Basic, DA and years of service for calculation..",Toast.LENGTH_SHORT).show();
        }

    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.sharemenu,menu);
        return true;
    }

}
