package com.hegdeapps.financecalc;


import android.content.Context;

public class CreateBankRates {
    static double getInterestRate(Context ctx, String bankName, int numDays, boolean isSenior) {
        if (bankName.equals(ctx.getResources().getString(R.string.SBI)))
            return sbiInterestRate(numDays, isSenior);
        else if (bankName.equals(ctx.getResources().getString(R.string.ICICI)))
            return iciciInterestRate(numDays, isSenior);
        else if (bankName.equals(ctx.getResources().getString(R.string.HDFC)))
            return hdfcInterestRates(numDays, isSenior);
        else if (bankName.equals(ctx.getResources().getString(R.string.PNB)))
            return pnbInterestRates(numDays, isSenior);
        else if (bankName.equals(ctx.getResources().getString(R.string.CANARA)))
            return canaraInterestRates(numDays, isSenior);

        else if (bankName.equals(ctx.getResources().getString(R.string.AXIS)))
            return axisInterestRates(numDays, isSenior);
        else if (bankName.equals(ctx.getResources().getString(R.string.UNIONBANK)))
            return unionInterestRates(numDays, isSenior);
        else if (bankName.equals(ctx.getResources().getString(R.string.IDBI_BANK)))
            return idbiInterestRates(numDays, isSenior);

        else if (bankName.equals(ctx.getResources().getString(R.string.BANK_BARODA)))
            return barodaInerestRates(numDays, isSenior);
        else return 0.0;
    }

    private static double  hdfcInterestRates(int numDays,boolean senior){
        double rate;
        if(numDays>=7 && numDays<=29) rate = 2.5;
        else if( numDays<=90)  rate = 3.0;
        else if( numDays<=180)    rate = 3.5;
        else if(numDays<=364)   rate = 4.4;
        else if(numDays<=730)      rate = 4.9;
        else if(numDays<=1095)    rate = 5.15;
        else if(numDays<=1825)     rate = 5.30;
        else if(numDays<=3650)     rate = 5.5;
           else  rate = 0.0;
        if (senior) {
            if (numDays > 1825)
                rate = 6.25;
            else
                rate = rate + 0.5;
        }
        return rate;
    }

    /**
     * Punjab National Bank interest rates
     */
    private static double  pnbInterestRates(int numDays, boolean senior){
        double rate;
        if(numDays>=7 && numDays<=45) rate = 3.0;
        else if(numDays<=90)    rate = 3.25;
        else if(numDays<=179)  rate = 4.0;
        else if(numDays<=270) rate = 4.4;
        else if(numDays<=364)    rate = 4.5;
         else if(numDays<=1095)    rate = 5.1;
          else if(numDays<=3650)   rate = 5.25;
            else  rate = 0.0;
 
        if (senior) {
            rate = rate + 0.5;
        }
        return rate;
    }

    private static double  iciciInterestRate(int numDays, boolean senior)  {
        if (numDays < 7)
            return 0.0;
       else if(numDays<=14)
           return 2.5;
        else if(numDays<=29)return 2.5;
        else if(numDays<=60)return 2.75;
        else if(numDays<=90)   return 3.0;
        else if(numDays<=184)return 3.0;
        else if(numDays<=270)return 3.5;
        else if(numDays<=364)return 3.65;
        else if(numDays<=539)return 3.75;
        else if(numDays<=730)return 4.0;
           else  return 4.4;
        }
    

    /**
     * return interest rate by statebank of india
     * -1 if insufficient data
     *
     * @param numDays  - number of days
     * @param isSenior - is senior citizen
     */
    private static double  sbiInterestRate(int numDays,boolean isSenior){
        if (numDays >= 7 && numDays < 46)
             if (isSenior)
                 return 3.4;
        else
                 return  2.9;
        else if (numDays >= 46 && numDays < 180)
            return  isSenior?4.4:3.9;
        else if (numDays >= 180 && numDays < 211)
            return isSenior? 4.9:4.4;
        else if (numDays >= 211 && numDays < 365)
            return isSenior?4.9: 4.4;
        else if (numDays >= 365 && numDays < 730) /*2 yer*/
            return isSenior?5.5:5.0;
        else if (numDays >= 730 && numDays < 1095) /*3 year*/
            return  isSenior?5.6:5.1;
        else if (numDays >= 1095 && numDays < 1825) /*5 years*/
            return  isSenior?5.8:5.3;
        else if (numDays >= 1825)
            return  isSenior?6.2: 5.4;
        else
        return 0;

    }

    private static double  canaraInterestRates(int numDays,boolean senior)  {
        double rate;

            if(numDays>=7&&numDays<=45)rate = 2.95;
           else if(numDays<=90)rate = 3.9;
            else if(numDays<=179)rate= 4.0;
            else if(numDays<=364)rate = 4.45;
            else if(numDays<= 730)rate = 5.2;
            else if(numDays<=1095)rate = 5.4;
            else if(numDays<=1825)rate = 5.5;
            else if(numDays<=3650)rate = 5.5;
            else rate = 0.0;
        if (senior) {
            if (numDays >= 180)
                rate = rate + 0.5;
        }
        return rate;
    }

    private static double  axisInterestRates(int numDays,boolean isSenior){
        double rate = 0.0;
        if (!isSenior){
           if(numDays>=7 && numDays<=29)
             rate = 2.5;
            else if(numDays<=89) rate = 3.0;

           else if(numDays<=179)rate = 3.5;
           else if(numDays<=364)  rate = 4.4;
            else if(numDays<=369)  rate = 5.1;
            else if(numDays<=375)  rate = 5.15;
           else if(numDays<=539) rate = 5.10;

           else if(numDays<=730)  rate = 5.25;
           else if(numDays<=1824)  rate = 5.40;

            else if(numDays<=3650)  rate = 5.75;
            else  rate = 0.0;

        }
       else{
                if(numDays>=7 && numDays<=29)  rate = 2.5;
                else if(numDays<=89)  rate = 3.0;
                else if(numDays<=179)  rate = 3.5;
                else if(numDays<=364)  rate = 4.65;
                else if(numDays<=369 ) rate = 5.75;
               else if(numDays<=374)  rate = 5.8;
                else if(numDays<=539)  rate = 5.75;
                else if(numDays<=629 ) rate = 5.9;
                else if(numDays<=899 ) rate = 6.05;
                else if(numDays<=1824)  rate = 5.9;
                else if(numDays<=3650 ) rate = 6.5;

        }
        return rate;

    }

    private static double  unionInterestRates(int numDays,boolean senior)
      {
        double rate;
        if(numDays>=7 &&numDays<=45) rate = 3.0;
           else if(numDays<=90) rate = 3.5;
           else if(numDays<=120) rate = 3.5;
             else if(numDays<=180) rate = 4.3;
           else if(numDays<=364) rate = 4.4;
             else if(numDays<=365) rate = 5.0;
             else if(numDays<=730) rate = 5.2;
             else if(numDays<=1095) rate = 5.4;
             else if(numDays<=1825)  rate = 5.5;
             else if(numDays<=3650) rate = 5.6;
            else  rate = 0.0;

        
        if (senior) {
            rate = rate + 0.5;
        }
        return rate;

    }

    private static double  idbiInterestRates(int numDays,boolean senior)  {
        double rate;
         
           if(numDays<=30)  rate = 2.7;
            else if(numDays<=45)    rate = 2.8;
           else if(numDays<=60)  rate = 3.0;
            else if(numDays<=90)  rate = 3.0;
           else if(numDays<=180)  rate = 3.5;
            else if(numDays<=364)  rate = 4.3;
            else if (numDays==365)   rate = 5.0;

            else if(numDays<=730)  rate = 5.1;
            else if(numDays<=1094)  rate = 5.1;
            else if (numDays==1824)   rate = 5.3;
            else if (numDays==1825)  rate = 5.25;
            else if (numDays<=3650)   rate = 5.25;
            else if (numDays==7300)  rate = 4.8;
            else   rate = 0.0;
            
        if (senior) {
            rate = rate + 0.5;
        }
        return rate;
    }

    private static double  barodaInerestRates(int numDays,boolean senior) {
        double rate;        
        if(numDays>=7&&numDays<46) rate = 2.8;
              else if(numDays<= 90) rate = 2.8;
              else if(numDays<=180) rate = 3.5;
              else if(numDays<= 270) rate = 4.3;
              else if(numDays<= 364) rate = 4.4;
            else if(numDays==365) rate = 4.9;
              else if(numDays<= 730) rate = 5.0;
              else if(numDays<= 1095) rate = 5.1;
              else if(numDays<= 1825)  rate = 5.25;
              else if(numDays<= 3650)  rate = 5.25;
        else  rate = 0.0;
        if (senior) {
            if (numDays > 3650)
                rate += 1.0;
            else
                rate = rate + 0.5;
        }
        return rate;
    }



    /**************RD rates *********************************/
    static double getRDInterestRate(Context ctx, int numDays, String bankName, boolean isSenior) {
        if (bankName.equalsIgnoreCase(ctx.getResources().getString(R.string.SBI)))
            return sbiInterestRDRate(numDays, isSenior);
        else if (bankName.equalsIgnoreCase(ctx.getResources().getString(R.string.HDFC)))
            return hdfcRDRates(numDays, isSenior);
        else if (bankName.equalsIgnoreCase(ctx.getResources().getString(R.string.ICICI)))
            return iciciRDRates(numDays, isSenior);
        else if (bankName.equalsIgnoreCase(ctx.getResources().getString(R.string.AXIS)))
            return axisRDRates(numDays, isSenior);
        else if (bankName.equalsIgnoreCase(ctx.getResources().getString(R.string.CANARA)))
            return canaraRDRates(numDays, isSenior);
        else if(bankName.equals(ctx.getResources().getString(R.string.PNB)))
            return PNBRDRates(numDays,isSenior);
        else if(bankName.equals(ctx.getResources().getString(R.string.BANK_BARODA)))
            return barodaRDrates(numDays, isSenior);
        else if(bankName.equals(ctx.getResources().getString(R.string.IDBI_BANK)))
            return idbiRDRate(numDays,isSenior);
        else if(bankName.equals(ctx.getResources().getString(R.string.UNIONBANK)))
            return unionRDRates(numDays, isSenior);
        return 0.0;
    }

    /**
     * no info about senior citizens?
     */
    static double axisRDRates(int numDays,boolean senior){
        double rate = 0.0;
        
            if(numDays>=180 && numDays<=364) rate=4.4;
            else if(numDays<=370) rate=5.1;
            else if(numDays<= 376) rate=5.15;
            else if(numDays<= 390) rate=5.15;
            else if(numDays<= 395) rate=5.1;
            else if(numDays<= (15 * 30)) rate=5.1;
            else if(numDays<= (18 * 30)) rate=5.2;
            else if(numDays<= (2 * 365)) rate=5.25;
            else if(numDays<= (30 * 30)) rate=5.4;
            else if(numDays<= (60 * 30)) rate=5.4;
            else if(numDays<= (120 * 30)) rate=5.75;
        else rate=0.0;
       
        return rate;
    }


    static double sbiInterestRDRate(int numDays,boolean senior){
        double rate = 0.0;
         
              if(numDays>= 365 &&numDays<=729) rate=5.0;
            else if(numDays<=1094) rate=5.1;
            else if(numDays<= 1824) rate=5.3;
            else if(numDays<= 3650) rate=5.4;
        else   rate=0.0;
        
        if (senior) {
            if (numDays >=1825 && numDays<=3650)
            rate = 6.2;
            else
            rate += 0.5;
        }
        return rate;
    }

   static  double hdfcRDRates(int numDays,boolean senior) {
        double rate = 0.0;
        if(numDays>=6*30 && numDays<=9*30) rate = 3.5;
             
          else if(numDays<=9 * 30) rate=4.4;
            else if (numDays<= 24 * 30 )rate=5.1;
           else if (numDays<=  36 * 30)rate=5.15;
            else if (numDays<= 60 * 30)rate=5.3;
            else if (numDays<= 120 * 30)rate=5.5;
        else rate=0.0;
        
        if (senior)
            rate = rate + 0.5;
        return rate;
    }

    static double iciciRDRates(int numDays,boolean senior){
        double rate = 0;
        int numMonths = numDays/30;
            if(numMonths<6)rate=0;
            else if(numMonths==6) rate=3.5;
            else if(numMonths<= 9) rate=4.4;
            else if(numMonths<= 15) rate=4.9;
            else if(numMonths<=24)rate=5.0;
            else if(numMonths<36) rate=5.2;
            else if(numMonths<=60)rate=5.40;
            else if(numMonths<= 120) rate=5.60;
        else rate=0.0;
        if (senior)
            if (numMonths >= (5 * 12) && numMonths<=(10*12))
                rate = 6.3;
            else
                rate = rate + 0.5;
        return rate;
    }

    static double canaraRDRates(int numDays,boolean isSenior){
        double rate;
                
              if(numDays>= 180. &&numDays<=364) rate=4.45;
             else if(numDays<= 729) rate=5.2;
             else if(numDays<=  1094) rate=5.4;
             else if(numDays<=  1824) rate=5.5;
             else if(numDays<= 3650) rate=5.5;
          else rate=0.0;
        if (isSenior)
            rate = rate + 0.5;
        return rate;
    }
    static double barodaRDrates(int numDays,boolean isSenior){
        double rate = 0;
        if(numDays==180)
            rate = 3.7;
        else if(numDays>180 && numDays<=270)
            rate = 4.3;
        else if(numDays<365)
            rate = 4.4;
        else if(numDays==365)
            rate = 4.9;
        else if(numDays<=400)
            rate = 5.0;
        else if(numDays<=(2*365))
            rate = 5.0;
        else if(numDays<=(3*365))
            rate  = 5.1;
        else if(numDays<=(10*365))
            rate = 5.25;
        return  rate;
    }
    static double unionRDRates(int numDays,boolean isSenior){
        double rate=0;
        if(numDays>=180 &&numDays<365)
            rate = 5.5;
        else if(numDays==365)
            rate = 5.75;
        else if(numDays>365 &&numDays<=443)
            rate =5.75;
        else if(numDays==444)
            rate = 5.85;
        else if(numDays>444 && numDays<=554)
            rate = 5.75;
        else if(numDays==555)
            rate = 5.9;
        else if(numDays>555 && numDays<(3*365))
            rate = 5.75;
        else if(numDays<=(10*365))
            rate = 5.8;
        return  rate;
    }
    static double PNBRDRates(int numDays,boolean isSenior){
        double rate = 0;
        if(numDays<180 ||numDays>3650)
            rate = 0;
        else if(numDays<=270)
            rate = 4.4;
        else if(numDays<365)
            rate  = 4.5;
        else if (numDays==730)
            rate = 5.0;
        else if(numDays<=(3*365))
            rate = 5.1;
        else /*if(numDays<=3650)*/
            rate =5.25;

        if(isSenior)
            rate +=0.5;
        return  rate;
    }
    static double idbiRDRate(int numDays,boolean isSenior){
        double rate  =0;
        if(numDays<365)
            rate  = 0;
        else if(numDays==365)
            rate  = 4.9;
        else if(/*numDays>=365 &&*/ numDays<=730)
            rate = 5;
        else if(numDays<=(3*365))
            rate = 5.1;
        else if(numDays<=3650)
            rate =5.2;
        else
            rate =0;
        return rate ;
    }
    /** TODO add disclaimer for rates*/

    }

