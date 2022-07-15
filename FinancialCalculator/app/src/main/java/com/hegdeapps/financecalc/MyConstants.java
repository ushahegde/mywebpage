package com.hegdeapps.financecalc;

/**
 * Created by ushahegde on 2/27/17.
 */
 public class MyConstants {
    static String ICICI = "ICICI Bank";
    static String SBI = "State Bank of India";
    static String HDFC = "HDFC Bank";
    static String BANK_BARODA = "Bank of Baroda";
    static String IDBI_BANK = "IDBI Bank";
    static String AXIS = "Axis Bank";
    static String UNIONBANK = "Union Bank";
    static String CANARA = "Canara Bank";
    static String PNB = "Punjab National Bank";
    static String INTEREST_210_TO_1YEAR = "rate210daysto1yr";
    static String INTEREST_180to210 = "rate180to210days";
    static String INTEREST_45to180 = "rate45to180days";
    static String INTEREST_ABOVE_5Y = "rate5YearAbove";//interst rate from 5 years and above
    static String INTEREST_3Y_TO_5Y = "rate3YearTo5Year";
    static String INTEREST_2Y_TO_3Y = "rate2YearTo3Year";
    static String INTEREST_1Y_TO_2Y = "rate1YearTo2Year";//rater from 1 year to 2 year
    static String INTEREST_45_TO_1YEAR = "rate45To1Year";//rate from 45 days to 1 year
    static String INTEREST_45 = "rate45";//Interest rate upto 45 days

    static String EXTRA_DEPOSIT_TYPE = "deposit type";

    static int EXTRA_FD = 1;

    static int EXTRA_RD = 2;

    static int EXTRA_EMI = 3;

    static String CURSOR_POSITION = "cursorPosition"; //which record we are editing

    static String BANK = "Bank";

    static String DEPOSIT_NUMBER = "DepositNumber";

    static String AMOUNT = "Amount";

    static String RATE = "Rate"; //TODO senior citizen?

    static String PERIOD = "Period";//TODO what about days or months or years

    static String INTEREST_PAYABLE_MODE = "InterestPayableMode";

    static String REMINDER = "Reminder";

    static String DEPOSITOR_NAME = "DepositorName";

    static String DEPOSIT_DATE = "DepositDate";

    static String BANK_ADDRESS = "BankAddress";

    static String BANK_PHONE = "BankPhone";

    static String CONTACT_PERSON = "ContactPerson";

    static String BANK_MAIL_ID = "BankEmailId";

    static String BANK_IFSC_CODE = "BankIFSCCode";

    static String CONTACT_PERSON_PHONE = "BankContactPersonPhone";

    static String ADD_NEW_BANK = "Add New Bank";

    static String LOAN_TYPE = "LoanType";

    static String LOAN_DATE = "LoanDate";

    static String INTEREST_TYPE = "interstType";
//TODO what is error here string or bool
    boolean IS_FIRST_USE = false;
        //"firstUse" //the app is used first time. So create username and password

    static String PASSWORD = "password";

    static String RECOVERY_MAIL_ID = "recovery emailid";

    static String ANSWER1 = "secret answer1";

    static String ANSWER2 = "secret answer2";

    static String SECRET_QN_1 = "secret question 1";

    static String SECRET_QN_2 = "secret question 2";

    static String LOGGED_IN = "user logged in";

    static String USER_NAMES = "user names";

    static String NAME_SEPARATOR = "#";//separates 2 names in shared pref static String USER_NAMES

    static String MATURITY_DATE = "MaturityDate";//no space in sql field name you moron

    static String HIDE_EXPIRED = "HideExpiredItems";

    static String LINE = "\n---------------------------------------\n";

    static String ROWID = "rowId";

    static String CAR_LOAN = "Car loan";

    static String HOUSING_LOAN = "Housing loan";

    static String VEHICLE_LOAN = "Vehicle loan";


    static String IS_APP_RUNNING = "we are in currrent session";

    static String NOT_PROTECT = "Password protection disabled";

    static String SET_PASSWORD = "set app password";

    static String BANK_NAMES = "Names of banks";

    static String BANK_NAME_SEPARATOR = "#";

    //public static final static String LOAN_OTHERS ="Others" ;
    static String  DOWN_PAYMENT = "DownPayment";

    static String SIMPLE = "simpleinterest";

    static String COMPOUND = "compoundinterest";

    static   String P_DAYS = "Days";

    static String P_MONTHS = "Months";

    static String P_YEARS = "Years";

    static String PERIOD_TYPE = "periodType";

    static String BORROWER_NAME = "BorrowerName";

    static   String rupee = " \u20b9";

    static String LOAN_PERSONAL = "Personal loan";

    private static final String OTHERS = "Others";
    static String[] bankNames = new String[]{SBI, HDFC, ICICI, UNIONBANK, BANK_BARODA,
            AXIS, CANARA, IDBI_BANK, PNB,OTHERS};
}
