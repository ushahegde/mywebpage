package com.hegdeapps.memoryace;

import android.content.Context;
import android.graphics.drawable.Drawable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;

import java.util.List;

class MyFaceGridAdapter extends BaseAdapter {
    final LayoutInflater mInflator;
    final Context mContext;
    final List<Integer> mImageResList;

    public MyFaceGridAdapter(Context ctx, List<Integer> imageResList) {
        mContext = ctx;
        mInflator = LayoutInflater.from(ctx);
        mImageResList = imageResList;
    }

    @Override
    public int getCount() {
        return mImageResList.size();
    }

    @Override
    public Integer getItem(int i) {
        return mImageResList.get(i);
    }

    @Override
    public long getItemId(int i) {
        return i;
    }

    @Override
    public View getView(int i, View convertView, ViewGroup viewGroup) {
        if (convertView == null) {
            convertView = mInflator.inflate(R.layout.faceimage, null);
        }
        ImageView im = (ImageView) convertView;
        im.setScaleType(ImageView.ScaleType.FIT_XY);
        im.setAdjustViewBounds(true);
        im.setPadding(5,5,5,5);
        Drawable dr = mContext.getResources().getDrawable(mImageResList.get(i));
        im.setImageDrawable(dr);
        //      im.setBackgroundColor(Color.BLACK);
        //  im.setLayoutParams(new GridView.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT));
        return convertView;
    }
}
