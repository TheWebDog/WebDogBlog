import {GET_SERVER_CLASSIFY,UPLOAD_File,SET_File,SAVE_File} from './type'
export default {
  action_querySearchAsync: function (context) {
    context.commit(GET_SERVER_CLASSIFY)
  },
  action_uploadSectionFile: function (context,param) {
    context.commit(UPLOAD_File,param)
  },
  action_PublishButton: function (context,data) {
    context.commit(SET_File,data)
  },
  action_PublishSave: function (context,saveData) {
    context.commit(SAVE_File,saveData)
  },
}
