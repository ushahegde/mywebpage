package com.hegdeapps.financecalc;

import android.content.Context;
import android.content.SharedPreferences;
import android.preference.PreferenceManager;
import android.text.TextUtils;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by ushahegde on 2/20/17.
 */
public class MyMethods {
    /* currently we are adding period months to get maturity date.
    TODO take care of period in years and days
     */

    static Calendar getMaturityDate(String depoistDate,int period, String periodType) {
        String[] arr = depoistDate.split("/");
        if (arr.length < 3) {
            return null;
        }
        int dd = Integer.valueOf(arr[0]);
        int mm = Integer.valueOf(arr[1]);
        int yy = Integer.valueOf(arr[2]);
        Calendar cal = Calendar.getInstance();
        cal.set(Calendar.YEAR,yy);
        cal.set(Calendar.MONTH,mm-1);
        cal.set(Calendar.DAY_OF_MONTH,dd);
        if (periodType.equals(MyConstants.P_DAYS)) {
            cal.add(Calendar.DAY_OF_MONTH, period);
        } else if (periodType .equals( MyConstants.P_MONTHS) ){
            cal.add(Calendar.MONTH, period);
        } else {
            cal.add(Calendar.YEAR, period);
        }
        return cal;
    }

    static ArrayList getNamesFromPref(Context ctx) {
        ArrayList list = new ArrayList<String>();
        SharedPreferences pref = PreferenceManager.getDefaultSharedPreferences(ctx);
        String strNames = pref.getString(MyConstants.USER_NAMES, null);
        if (strNames != null) {
            String[] strArray = strNames.split(MyConstants.NAME_SEPARATOR);
            return (ArrayList<String>)Arrays.asList(strArray);
            //TODO why was this so wrong. Verify
        }
        return list;
    }

    /**
     * save name so that next time, it appears in autocomplete
     * @param userName
     */
    static void saveNameToPref(String userName, Context ctx) {
        //String userName = userName;
        userName = toWordCase(userName) ;//capitalize first letter of each word
        SharedPreferences pref = PreferenceManager.getDefaultSharedPreferences(ctx);
        String names = pref.getString(MyConstants.USER_NAMES, null);
        if (names != null && names.contains(userName)) { //Name already present. Go out
            return;
        }
        if (names == null) {
            names = userName;
        } else {
            names = "$names#";
            names = names + userName;
        }
        SharedPreferences.Editor editor = pref.edit();
        editor.putString(MyConstants.USER_NAMES, names);
        editor.commit();
    }

    static String toWordCase( String str) {
        String[] arr = str.split(" ");
        String totalString = "";
        for (int i=0;i<arr.length;i++) {
            String temp = arr[i].trim();
            if (!TextUtils.isEmpty(temp)) {
                char ch = Character.toUpperCase(temp.charAt(0));
                temp = ch + temp.substring(1);
                totalString+=temp+" ";
            }
        }
        return totalString;
    }

    /**
     * this is a method where date is given as yyyy/mm/dd instead of dd/mm/yyyy
     * @param dt in the form yyyy/mm/dd
     * @param period in periodtype
     * @param periodType
     * @return
     */
   /* static Calendar getMaturityDate2(String dt, int period, String periodType) {
        String [] arr = dt.split("/");
        int yy = Integer.valueOf(arr[0]);
        int mm = Integer.valueOf(arr[1]);
        int dd = Integer.valueOf(arr[2]);
        Calendar cal = Calendar.getInstance();
        cal.set(yy,mm-1,dd);
        //cal[yy, mm - 1] = dd
        if (periodType == MyConstants.P_DAYS) {
            cal.add(Calendar.DAY_OF_MONTH, period);
        } else if (periodType == MyConstants.P_MONTHS) {
            cal.add(Calendar.MONTH, period);
        } else {
            cal.add(Calendar.YEAR, period);
        }
        return cal;
    }

    static void getMaturityDate3(dt: String?, period: Int, periodType: String?): Calendar? {
        val format = SimpleDateFormat("dd-MMM-yyyy")
        try {
            val date1 = format.parse(dt)
            val cal = Calendar.getInstance()
            cal.time = date1
            if (periodType == MyConstants.P_DAYS) {
                cal.add(Calendar.DAY_OF_MONTH, period)
            } else if (periodType == MyConstants.P_MONTHS) {
                cal.add(Calendar.MONTH, period)
            } else {
                cal.add(Calendar.YEAR, period)
            }
            return cal
        } catch (e: ParseException) {
            e.printStackTrace()
        }
        return null
    }
*/
    /**
     * Find maturity date
     * @param dt start date in the format dd-MMM-yyyy ie 05-Jan-2017
     * @param dd no of days to be added
     * @param mm no of months
     * @param yy on of years
     * @return dt + dd+mm+yy
     */
    /*static void getMaturityDate3comp(dtStr: String?, dd: Int, mm: Int, yy: Int): Calendar? {
        val format = SimpleDateFormat("dd-MMM-yyyy")
        try {
            val dt = format.parse(dtStr)
            val cal = Calendar.getInstance()
            cal.time = dt
            cal.add(Calendar.DAY_OF_MONTH, dd)
            cal.add(Calendar.MONTH, mm)
            cal.add(Calendar.YEAR, yy)
            val numDays = getNumDaysBetween(cal.time, dt)
            //   nd = numDays;
            return cal
        } catch (e: ParseException) {
            e.printStackTrace()
        }
        return null
    }
*//**
    TODO  is it correct ?
     */
    static int getNumDaysBetween( Date dt1, Date dt2) {
        long time1 = dt1.getTime();
        long time2 = dt2.getTime();
        long seconds = (time1 - time2) / 1000;
        long minutes = seconds / 60;
        return (int) (minutes / (60 * 24));
    }

    static String formatDouble(double num) {
        DecimalFormat formatter = new DecimalFormat("##,##,###.00");
        return MyConstants.rupee + formatter.format(num);
    }

    static boolean isDateValid(String depDate) {
        SimpleDateFormat format = new SimpleDateFormat("dd-MMM-yyyy");
        try {
            format.parse(depDate);
        } catch ( ParseException e) {
            return false;
        }
        return true;
    }

    static List<String> getBanknamesFromPref(Context ctx) {
        List<String> list =new ArrayList<String>();
        SharedPreferences pref  = PreferenceManager.getDefaultSharedPreferences(ctx);
        String strBankNames = pref.getString(MyConstants.BANK_NAMES, null);
        if (strBankNames != null) {
            String[] strArray = strBankNames.split(MyConstants.BANK_NAME_SEPARATOR);
            return Arrays.asList(strArray);
           /* if (strArray.length > 0) {
                int l = strArray.length
                list.addAll(Arrays.asList(*strArray).subList(0, l));
                return list
            }*/
        }
        return list;/*TODO * is this empty. Will it cause problems?*/

    }
}

/*

    static void saveBankToPref(bankName: String?, ctx: Context?) {
        var bankName = bankName
        val pref: SharedPreferences = PreferenceManager.getDefaultSharedPreferences(ctx)
        bankName = toWordCase(bankName).trim { it <= ' ' }
        var bankNames: String? = pref.getString(MyConstants.BANK_NAMES, null)
        if (bankNames != null && bankNames.contains(bankName)) { //Name already present. Go out
            return
        }
        if (bankNames == null) {
            bankNames = bankName
        } else {
            bankNames = bankNames + MyConstants.BANK_NAME_SEPARATOR
            bankNames = bankNames + bankName
        }
        val editor: SharedPreferences.Editor = pref.edit()
        editor.putString(MyConstants.BANK_NAMES, bankNames)
        editor.commit()
    }
}*/
