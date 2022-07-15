package com.hegdeapps.financecalc;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

import java.text.NumberFormat;
import java.util.List;

/**
 * Created by usha on 15/4/17.
 */

class MyAmortAdapter extends BaseAdapter {
    List<AmortItem> mList;
    Context mContext;
    LayoutInflater inflater;
    double mEmi;
    public MyAmortAdapter(Context ctx, List<AmortItem> amortList,double emi) {
        super();
        mList = amortList;
        mContext = ctx;
        inflater = LayoutInflater.from(ctx);
        mEmi = emi;
    }

    @Override
    public int getCount() {
        return mList.size();
    }

    @Override
    public Object getItem(int position) {
       return mList.get(position);
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        if(convertView==null){
            convertView = inflater.inflate(R.layout.amort_row,parent,false);
        }
        TextView tvEmi = (TextView)convertView.findViewById(R.id.Emi);
        TextView tvPrincipalPart = (TextView)convertView.findViewById(R.id.principalPart);
        TextView tvInterestPart = (TextView)convertView.findViewById(R.id.interestPart);
        TextView tvMonth = (TextView)convertView.findViewById(R.id.month);
        TextView tvPrincipalRemaining = (TextView)convertView.findViewById(R.id.principalRemaining);

        AmortItem item = (AmortItem)getItem(position);
        tvMonth.setText(String.format("%3d",item.month));
        NumberFormat formatter = NumberFormat.getIntegerInstance();
        String str = formatter.format(mEmi);

        tvEmi.setText(str);
        str = String.format("%,6d",(int)item.interestPart);//formatter.format((int)item.interestPart);
        tvInterestPart.setText(str);
        str =   String.format("%,6d",(int)item.principalPart);//formatter.format((int)item.principalPart);
        tvPrincipalPart.setText(str);
        str =   String.format("%,9d",(int)item.principalRemaining);//str = formatter.format((int)item.principalRemaining);
        tvPrincipalRemaining.setText(str);
        return convertView;
    }
}
