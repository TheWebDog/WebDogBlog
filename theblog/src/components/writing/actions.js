import { GET_ETXTAREA, GET_VALUE,GET_CLASSIFY ,SUBMIT,GET_SERVER_CLASSIFY} from './type'

export default {
  get_server_classify: function (context) {
    context.commit(GET_SERVER_CLASSIFY)
  },
  get_input: function (context, input) {
    context.commit(GET_VALUE, input)
  },
  get_textarea: function (context, textarea) {
    context.commit(GET_ETXTAREA, textarea)
  },
  get_classify: function (context, classify) {
    context.commit(GET_CLASSIFY, classify)
  },
  btn_submit: function (context) {
    context.commit(SUBMIT)
  },
}
