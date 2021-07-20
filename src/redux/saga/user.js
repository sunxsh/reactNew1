import { put, takeEvery, call, takeLatest, race, delay, all } from 'redux-saga/effects'
import { requestCode } from '@/utils/varbile'
import * as SAGA from '@/redux/constants/sagaType'
import { findAllUsers } from '@/api/login'
import { menuRouter } from '@/router/routers'
import { getMenuTree, getUserList, getUserInfo, loadingMenuTree,
  loadingUserInfo} from '@/redux/action/user'
import { localStorage } from '@/assets/js/storage'
import * as types from '@/redux/constants/actionType'

export const effects = {

  *getMenTreeModule(res) {
    try {
      yield put(loadingMenuTree(false));
      yield delay(500);
      const filterHiddle = menuRouter.filter(item => !item.hiddle);
      yield all([put(loadingMenuTree(true)), put(getMenuTree(filterHiddle))]);
      yield call(effects.getUserInfoDataModule);
    } catch (error) {
      yield put(getMenuTree([]));
    }
  },

  *getUserInfoDataModule() {
    try {
      yield put(loadingUserInfo(false));
      const userInfo = localStorage.getItem('userInfo') ? localStorage.getItem('userInfo') : {};
      yield delay(500);
      yield all([put(loadingUserInfo(true)), put(getUserInfo(userInfo))]);
    } catch (error) {
      yield put(getUserInfo({}));
    }
  }
}

export default function* users() {
  yield takeEvery(SAGA.SAGA_GETMENUTREE, effects.getMenTreeModule);
  yield takeEvery(SAGA.SAGA_GET_USER_INFO, effects.getUserInfoDataModule);
}
