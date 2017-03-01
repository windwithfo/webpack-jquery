/**
 * @file   测试首页
 * @author windwithfo(windwithfo@yeah.net)
 */

// common for bootstrap
import $        from 'jquery';
import template from 'template';
import 'comjs/common';
import 'comcss/common';

// local files
import './css/style';
import config from './js/config';

console.log(config);

// FetchData or SendData
$.get('/api/sign_in', function (ret) {
    console.log(ret);
});

// event regedit
$('#btn').on('click', function () {
    console.log('click');
});

$(function () {
    $("[data-toggle='popover']").popover();
});

const data = {
    text: 'dialog',
    content: '测试数据<p>1232</p>'
};
const html = template('tpl_dialog', data);
$('#c_dialog').html(html);
