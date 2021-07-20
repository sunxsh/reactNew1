import { call } from 'redux-saga/effects'
import { requestCode } from '@/utils/varbile'

export const commonFeatures = {
  *listOptions(api, payload) { // 相同的业务功能
    try {
      const res = yield call(api, payload);
      if (res.code === requestCode.successCode) {
        let { rows = [], total = 0 } = res.data;
        return { rows, total };
      }
    } catch (error) {
      return { rows: [], total: 0 };
    }
  }
}

export const commonFeaturesList = {
  *listOptions(api, payload) {
    try {
      const res = yield call(api, payload);
      if (res.code === requestCode.successCode) {
        return res.data || [];
      }
    } catch (error) {
      return [];
    }
  }
}
