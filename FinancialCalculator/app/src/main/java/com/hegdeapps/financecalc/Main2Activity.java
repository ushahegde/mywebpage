package com.hegdeapps.financecalc;

import android.app.Activity;
import android.content.Intent;
import android.content.SharedPreferences;
import android.media.Image;
import android.net.Uri;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.view.View;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.Toolbar;


public class Main2Activity extends Activity
        implements   View.OnClickListener {

    private static final int FDS = 1;
    private static final int RDS = 2;
    private static final int EMIS =3;
    private static final int RATE_APP =4 ;
    private static final int OTHER_APPS =5 ;

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.calculations4);

        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setActionBar(toolbar);
        setTitle("Financial Calculator");
        //setSupportActionBar(toolbar);


        SharedPreferences pref = PreferenceManager.getDefaultSharedPreferences(this);
        //boolean firstUse = pref.getBoolean(MyConstants.IS_FIRST_USE,true);

        setButtonListeners();

       // setPrefAppRunning(true);

    }

    void setButtonListeners(){
        Button btnSI = (Button)findViewById(R.id.si);
        btnSI.setOnClickListener(this);

        Button btnCI = (Button)findViewById(R.id.ci);
        btnCI.setOnClickListener(this);

        Button btnSavingsGoal = (Button)findViewById(R.id.goal);
        btnSavingsGoal.setOnClickListener(this);

        Button btnEmi = (Button)findViewById(R.id.emi);
        btnEmi.setOnClickListener(this);

        Button btnRD = (Button)findViewById(R.id.rd);
        btnRD.setOnClickListener(this);

        Button btnFD = (Button)findViewById(R.id.fd);
        btnFD.setOnClickListener(this);

        Button btnGratuiity = (Button)findViewById(R.id.gratuity);
        btnGratuiity.setOnClickListener(this);

        Button btnAfford = (Button)findViewById(R.id.afford);
        btnAfford.setOnClickListener(this);

    }

    @Override
    public void onClick(View v) {
        int id = v.getId();
        switch(id){
            case R.id.si: calculateInterest(MyConstants.SIMPLE);
                break;
            case R.id.ci:calculateInterest(MyConstants.COMPOUND);
                break;
            case R.id.goal: calculateMonthlySavings();
                break;
            case R.id.emi: calculateEMI();
                break;
            case R.id.rd:calculate_RD();
                break;
            case R.id.fd:calculate_FD();
                break;
            case R.id.gratuity:calculateGratuity();
                break;
            case R.id.afford: startAffordActivity();
                break;

        }
    }

    private void startAffordActivity() {

        startActivity(new Intent(this,LoanAffordability.class));
    }

    private boolean loggedIn() {
        SharedPreferences pref = PreferenceManager.getDefaultSharedPreferences(this);
        boolean logged = pref.getBoolean(MyConstants.LOGGED_IN,false);
        return logged;
    }

    /*   @Override
    public void onBackPressed() {
        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        if (drawer.isDrawerOpen(GravityCompat.START)) {
            drawer.closeDrawer(GravityCompat.START);
        } else {
            super.onBackPressed();
           *//* setPrefAppRunning(false);
            this.finish();*//*
        }
    }*/

    //TODO do we add navigation bar why?

    private void startPlayStore(int code) {
        String url ="";
        if(code==RATE_APP) {
             url= "https://play.google.com/store/apps/details?id=com.hegdeapps.savings";
        } else if (code == OTHER_APPS ){
              url = "https://play.google.com/store/apps/developer?id=Usha Hegde";
        }
        Intent intent = new  Intent(Intent.ACTION_VIEW,Uri.parse(url));
        startActivity(intent);
    }

    private void calculateGratuity() {

        startActivity(new Intent(this,GratuityCalculator.class));
    }

    private void calculate_RD() {
        startActivity(new Intent(this,RDCalculator.class));
    }

    private void calculate_FD() {
        startActivity(new Intent(this,FDCalculator.class).putExtra(MyConstants.EXTRA_DEPOSIT_TYPE,
                MyConstants.EXTRA_FD));
    }

    private void calculateEMI() {
        startActivity(new Intent(this,CalculateEMI.class) );
    }

    private void calculateMonthlySavings() {
        startActivity(new Intent(this,SavingsGoalActivity.class) );

    }

    private void calculateInterest(String type) {
        startActivity(new Intent(this,SimpleInterest.class).putExtra(MyConstants.INTEREST_TYPE,type));

    }
    /*private void showEnableDisableScreen() {

        final Dialog d = new Dialog(this,R.style.Theme_AppCompat_Light);
        d.setContentView(R.layout.enablepassword);
        //Button btnEnablePassword = (Button)d.findViewById(R.id.passwordProtect);
        Button btnNotNow = (Button)d.findViewById(R.id.notnow);
        *//*btnEnablePassword.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                showPasswordScreen();
                d.dismiss();
            }
        });*//*
        btnNotNow.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                saveNotProtectPref();
                d.dismiss();
             //   LoginActivity.this.finish();//go back to home screen
            }
        });
        d.show();
    }*/

}
