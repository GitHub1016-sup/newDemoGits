var _GlobalFun = {};
var _GlobalVar = {
	IsAPICloud: true,
	NetError: "网络异常,请重新进入",
	Load: null,
	// /ajaxUrl: 'http://yiyao.shandongliangyu.com/api/',
	// ajaxUrl: 'http://8.140.181.94/api/',
	ajaxUrl:'http://192.168.50.144/index.php/api/',
	isLogin: false,
	userInfo: {
		id: null,
	},
	loadMore: Number(1),
	userLoginIDVar: '',
	is_loading: true,
}
function custConfirm(content, func) {
  api.confirm({
  	msg: content,
  	buttons: ['取消', '确定']
  }, function (ret, err) {
  	var index = ret.buttonIndex;
  	if (index == 2) {
  		func && func();
  	}
  })

}
function getHome(path, params, func) {
  api.ajax({
    url: _GlobalVar.ajaxUrl + '/home/' + path,
    method: 'post',
    data: {
      values: params
    },
  }, function (ret, err) {
    if (ret) {
      func(ret)
    } else { }
  });
}
function getShop(path, params, func) {
  api.ajax({
    url: _GlobalVar.ajaxUrl + '/shop/' + path,
    method: 'post',
    data: {
      values: params
    },
  }, function (ret, err) {
    if (ret) {
      func(ret)
    } else { }
  });
}

if (_GlobalVar.IsAPICloud) {
	_GlobalVar.userLoginIDVar = $api.getStorage('userLoginID')
}





_GlobalFun.ResizeFont = function () {
	document.getElementsByTagName("html")[0].style.fontSize = (document.documentElement.clientWidth / 750) * 16 + "px";
}

_GlobalFun.ResizeFont();

$(window).resize(function () {

	_GlobalFun.ResizeFont();

})






//是否包含当前字符串
_GlobalFun.isHrefIndexOf = function (name) {

	return window.location.href.indexOf(name) > -1

}



//获取页面参数
_GlobalFun.getPageParam = function (name) {
	return api.pageParam[name];
}


//显示loading
_GlobalFun.ShowKeyFrame = function () {
	if (_GlobalVar.is_loading == true) {

		if (_GlobalVar.IsAPICloud) {
			// if (_GlobalVar.Load == null) {
			// 	_GlobalVar.Load = api.require('UILoading');
			// }
			// _GlobalVar.Load.keyFrame({
			// 	rect: {
			// 		w: 80,
			// 		h: 100
			// 	},
			// 	styles: {
			// 		bg: 'rgba(0,0,0,0.5)',
			// 		corner: 5,
			// 		interval: 50,
			// 		frame: {
			// 			w: 80,
			// 			h: 80
			// 		}
			// 	}
			// });
		}
	}
}
//关闭loading
_GlobalFun.closeKeyFrame = function () {
	if (_GlobalVar.is_loading) {
		if (_GlobalVar.IsAPICloud) {
			// _GlobalVar.Load.closeKeyFrame();
		}
	}
}

//点击返回
_GlobalFun.ReturnBtn = function () {

	$(".Js_HeadReturnBtn").click(function () {

		_GlobalFun.comeBack();

	})

}


_GlobalFun.ReturnTop = function (obj) {

	$(".ReturnTopBtn").click(function () {
		$(obj).scrollTop(0);
	});

}



_GlobalFun.ScrollValue = function (obj, callback) {
	var _scrollValue = 0;
	$(obj).scroll(function () {
		_scrollValue = $(obj).scrollTop();
		callback && callback(_scrollValue);
	})

}




//没有登录的
_GlobalFun.notLogin = function () {



}


//弹框提示
_GlobalFun.alert = function (msg) {
	api.toast({
		msg: msg,
		global:true,
		duration: 3000,
		location:'middle',
	});
}



//手机号验证
_GlobalFun.verifyMobile = function (phone) {
	var _phone = Number(phone);
	return (/^1[3456789]\d{9}$/.test(_phone));
}

//身份证验证
_GlobalFun.cardVerify = function (card) {
	var pattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
	return pattern.test(card);
}

//上传图片
_GlobalFun.imgUpload = function (input, fill, callback) {

	var fileDom = document.getElementById(input);
	var previewDom = document.getElementById(fill);

	fileDom.addEventListener("change", e => {
		var file = fileDom.files[0];
		// 检查输入是否包含有效的图像文件
		if (!file || file.type.indexOf("image/") < 0) {
			fileDom.value = "";
			previewDom.src = "";
			return;
		}

		// 使用FileReader加载图像并显示图像预览
		var fileReader = new FileReader();

		fileReader.onload = function (e) {
			previewDom.src = e.target.result;
			callback && callback(previewDom.src);
		}

		fileReader.readAsDataURL(file);

	});
}

//获取数据
_GlobalFun.getAjax = function (portPage, portName, parameter, sccCallback) {
	api.ajax({
		url: _GlobalVar.ajaxUrl + portPage + '/' + portName,
		method: "get",
		timeout: 30,
		dataType: "json",
		returnAll: false,
		data: {
			values: parameter
		}
		// data: parameter,
	}, function (ret, err) {
		if (ret) {
			sccCallback && sccCallback(ret);
		}
		if (err) {
			_GlobalFun.alert(_GlobalVar.NetError);
		}
	});
}

//提交数据
_GlobalFun.postAjax = function (portPage, portName, parameter, sccCallback) {
	api.ajax({
		url: _GlobalVar.ajaxUrl + portPage + '/' + portName,
		method: "post",
		timeout: 30,
		dataType: "json",
		returnAll: false,
		data: {
			values: parameter
		}
	}, function (ret, err) {
		if (ret) {
			sccCallback && sccCallback(ret);
		}
		if (err) {
			_GlobalFun.alert(_GlobalVar.NetError);
		}

	});

}

//照片
_GlobalFun.UploadManage0 = function (callback) {
	var _this = this;
	if (_GlobalVar.IsAPICloud) {
		api.actionSheet({
			cancelTitle: '取消',
			buttons: ['手机相册']
		}, function (ret, err) {
			index = ret.buttonIndex;
			// console.log(JSON.stringify(index));
			if (ret) {
				//  console.log( JSON.stringify( ret ) );
				if (index == 1) {
					//拍照
					api.getPicture({
						sourceType: 'library',
						encodingType: 'jpg',
						mediaValue: 'pic',
						destinationType: 'url',
						allowEdit: false,
						quality: 100,
						saveToPhotoAlbum: false
					}, function (ret, err) {
						if (ret) {
							callback && callback(ret.data);
						}

					});
				}

			} else {
				// _GlobalFun.alert(err);
			}
		});
	}
}

//修改头像
_GlobalFun.ChangeHead = function (parameter, callback) {
	var _this = this;
	if (_GlobalVar.IsAPICloud) {
		_GlobalFun.ShowKeyFrame();
		api.ajax({
			url: _GlobalVar.ajaxUrl + 'user/set_head_img',
			method: 'post',
			data: {
				files: {
					file: parameter
				}
			}
		}, function (ret, err) {
			if (ret) {
				callback && callback(ret);
			} else {
				// _GlobalFun.alert(err);
			}
			_GlobalFun.closeKeyFrame();
		});
	}
}










//底部选择弹框
_GlobalFun.UploadManage = function (callback) {
	var _this = this;
	if (_GlobalVar.IsAPICloud) {
		api.actionSheet({
			cancelTitle: '取消',
			// buttons: ['拍照', '手机相册', '拍摄']
			buttons: ['拍照', '选择照片', '选择视频', '拍摄']
		}, function (ret, err) {
			index = ret.buttonIndex;
			// console.log(JSON.stringify(index));
			if (ret) {
				//  console.log( JSON.stringify( ret ) );
				if (index == 1) {
					//拍照
					api.getPicture({
						sourceType: 'camera',
						encodingType: 'jpg',
						mediaValue: 'pic',
						destinationType: 'url',
						allowEdit: false,
						quality: 100,
						saveToPhotoAlbum: false
					}, function (ret, err) {
						if (ret) {
							callback && callback(index, ret.data);
						} else {
							// _GlobalFun.alert(err);
						}

					});

				} else if (index == 2) {
					//手机相册
					api.getPicture({
						sourceType: 'library',
						encodingType: 'png',
						mediaValue: 'pic',
						destinationType: 'url',
						allowEdit: true,
						quality: 100,
						preview: true,
						saveToPhotoAlbum: false,

					}, function (ret, err) {
						if (ret) {
							callback && callback(index, ret.data);
						} else {
							// _GlobalFun.alert(err);
						}
					});

				} else if (index == 3) {
					//选择视频
					api.getPicture({
						sourceType: 'album',
						// encodingType: 'png',
						mediaValue: 'video',
						destinationType: 'url',
						saveToPhotoAlbum: false,
					}, function (ret, err) {
						if (ret) {
							callback && callback(index, ret.data);
						} else {
							// _GlobalFun.alert(err);
						}
					});

				} else if (index == 4) {


					var zySmallVideo = api.require('zySmallVideo');

					api.requestPermission({
						list: ['camera', 'microphone', 'storage']
					}, function (ret, err) {
						if (ret) {
							zySmallVideo.openNew({
								setFeatures: 1002,
								cameraInfo: {
									margin_r: 85, //距右
									margin_t: 125, //距上
								},
								MaxRecordTime: 10,
								videoColor: api.systemType == "ios" ? 0xcd0000 : "#cd0000",
								AVAssetExportPreset: "AVAssetExportPreset1280x720",
								//MinRecordTime:15,  //最少时间
								// mVideoSizeW: 720,
								// mVideoSizeH: 1280
							}, function (ret2, err) {
								// alert(JSON.stringify(ret2))
								callback && callback(index, ret2);
							});
						}
					});



				}

			} else {
				// _GlobalFun.alert(err);
			}
		});
	}
}

//上传视频
_GlobalFun.uploadVideo = function (parameter, callback) {
	var _this = this;
	if (_GlobalVar.IsAPICloud) {
		_GlobalFun.ShowKeyFrame();
		api.ajax({
			url: _GlobalVar.ajaxUrl + 'home/post_home_up_img',
			method: 'post',
			data: {
				files: {
					files: parameter
				}
			}
		}, function (ret, err) {
			if (ret) {
				callback && callback(ret);
			} else {
				// _GlobalFun.alert(err);
			}
			_GlobalFun.closeKeyFrame();

		});
	}
}

//上传图片
_GlobalFun.uploadPic = function (parameter, callback) {
	var _this = this;
	if (_GlobalVar.IsAPICloud) {
		_GlobalFun.ShowKeyFrame();
		api.ajax({
			url: _GlobalVar.ajaxUrl + 'home/post_home_up_img',
			method: 'post',
			data: {
				files: {
					files: parameter
				}
			}
		}, function (ret, err) {
			if (ret) {
				callback && callback(ret);
			} else {
				_GlobalFun.alert(err);
			}
			_GlobalFun.closeKeyFrame();
		});
	}
}

//下拉刷新
_GlobalFun.initPullRefresh = function (callback) {
	if (_GlobalVar.IsAPICloud) {
		api.setRefreshHeaderInfo({
			loadingImg: '',
			bgColor: '#FFF',
			textColor: '#ccc',
			textDown: '下拉刷新...',
			textUp: '松开刷新...'
		}, function (ret, err) {
			callback && callback();
		});
	}
}

//上拉加载
_GlobalFun.UpLoadMore = function (callback) {
	if (_GlobalVar.IsAPICloud) {
		api.addEventListener({
			name: 'scrolltobottom',
			extra: {
				threshold: 0
			}
		}, function (ret, err) {
			//上拉加载时需要加载的数据
			callback && callback();
		});
	}
}


//确认   取消  弹窗
_GlobalFun.Confirm = function (title, content, callback) {
	api.confirm({
		title: title,
		msg: content,
		buttons: ['取消', '确定']
	}, function (ret, err) {
		var index = ret.buttonIndex;
		if (index == 2) {
			callback && callback();
		}
	})

}
//跳转页面
_GlobalFun.goToLoginPage = function (url, name, pageParam) {
	if(!$api.getStorage('userLoginID')){
		name = 'login';
		url = 'widget://html/login/index.html';
	}
	api.openTabLayout({
		name: name,
		url: url,
		hideNavigationBar: true,
		pageParam: pageParam,
		delay: '50',
		reload:true,
		progress: {
			type: 'default',
		}
	});
}
//跳转页面
_GlobalFun.goToPage = function (url, name, pageParam) {
	api.openTabLayout({
		name: name,
		url: url,
		hideNavigationBar: true,
		pageParam: pageParam,
		delay: '50',
		reload:true,
		progress: {
			type: 'default',
		}
	});
}

//返回首页的监听
_GlobalFun.ReturnHome = function () {

	if (_GlobalVar.IsAPICloud) {

		api.closeToWin({
			name: 'root'
		});
		api.sendEvent({
			name: 'fhsypage',
			extra: {
				msg: '返回首页'
			}
		});

	} else {
		location.href = '../home/index.html';
	}

}






//关闭当前窗口
_GlobalFun.closeWin = function () {
	if (_GlobalVar.IsAPICloud) {
		api.closeWin();
	}
	// else {
	// 	window.opener = null;
	// 	window.open('', '_self');
	// 	window.close();
	// }
}

//是否禁止滚动
_GlobalFun.IsBanScroll = function (isKey) {
	if (isKey == undefined) {
		isKey = false;
	}
	if (!isKey) {
		$('body').css({
			"overflow-y": "auto"
		});
	} else {
		$('body').css({
			"overflow-y": "hidden"
		});
	}

}


//返回
_GlobalFun.comeBack = function () {
	if (_GlobalVar.IsAPICloud) {
		api.historyBack({}, function (ret, err) {
			if (!ret.status) {
				api.closeWin();
				// goToPage('../html/home/index.html', 'fanhui', '');
			}
		});
	} else {
		window.history.back();
	}

}
_GlobalFun.goCar = function () {
	api.closeWin()
	api.sendEvent({
		name: 'gocar',
		extra: {
			msg: '底部菜单'
		}
	});
}





_GlobalFun.GetUserInfo = function () {

	_GlobalFun.getAjax('user', 'get_user_info', '', function (data) {
		if (data.code == 0) {
			_GlobalVar.userInfo.id = data.data.id;

			_GlobalVar.userInfo.isLogin = true;

			if (_GlobalVar.IsAPICloud) {
				$api.setStorage('userLoginID', data.data.id);
			}


		} else {
			// _GlobalFun.alert(data.msg);
			_GlobalVar.userInfo.isLogin = false;
			if (!_GlobalVar.userInfo.isLogin) {
				_GlobalFun.goToPage('../login/index.html', 'qdlym', '');
			}
		}
	})


}




//是否是API
_GlobalFun.IsAPI = function (yes, diyFix) {

	apiready = function () {
		if (diyFix == undefined) {
			if (api.statusBarAppearance) {
				var header = $api.byId('apiHeader');
				var Main = $('.Main');
				$api.fixStatusBar(header);
				Main.css({
					"padding-top": api.safeArea.top - 5
				});
			}
		} else {
			diyFix && diyFix();
		}
		api.setStatusBarStyle({
			style: 'dark',
			color: 'rgba(0,0,0,0)',
			animated: true
		});

		yes && yes();

		_GlobalFun.ReturnBtn();

		_GlobalFun.ReturnTop(document);


	}
}

// 新的打开页面方式，适配新苹果规则
_GlobalFun.openNew = function (url, name, title, param, hideNavigationBar, navigationBar) {
	if (!navigationBar) {
		navigationBar = {
			background: '#ffffff',
			color: '#000000'
		};
	} else {
		navigationBar = {
			background: '#ffffff',
			color: '#000000',
			rightButtons: [{
				text: navigationBar,
				color: '#333330',
				fontSize: '14',
			}]
		};
	}
	// 打开只有navigationBar的页面：
	api.openTabLayout({
		name: name,
		url: url,
		title: title ? title : '',
		hideNavigationBar: hideNavigationBar ? hideNavigationBar : false,
		navigationBar: navigationBar,
		pageParam: param,
		delay: '50',
		progress: {
			type: 'default',
		}
	});
}

//视频拍照
_GlobalFun.MediaView = function (obj, callback) {

	var inputBox = document.getElementById(obj);
	inputBox.addEventListener("change", function () {
		var reader = new FileReader();
		reader.readAsDataURL(inputBox.files[0]); //发起异步请求

		reader.onload = function (evt) {
			//读取完成后，数据保存在对象的result属性中
			var fileString = evt.target.result; // 读取文件内容
			// alert(fileString)
			callback && callback(fileString)
		}

	})

}



//上传媒体资源
_GlobalFun.MediaUpload = function (parameter, callback) {
	var _this = this;
	if (_GlobalVar.IsAPICloud) {
		_GlobalFun.ShowKeyFrame();
		api.ajax({
			type: 'POST',
			charset: 'base64',
			url: _GlobalVar.ajaxUrl + 'home/post_home_up_img',
			method: 'post',
			dataType: 'json',
			data: {
				files: {
					file: parameter
				}
			}
		}, function (ret, err) {
			if (ret) {
				callback && callback(ret);
			} else {
				_GlobalFun.alert(err);
			}
			_GlobalFun.closeKeyFrame();
		});
	}
}
_GlobalFun.openF = function (url, name) {
	api.openFrame({
		name: name,
		url: url,
		progress: {
			type: 'page',
		},
		rect: {
			x: 0,
			y: 0,
			w: 'auto',
			h: 'auto'
		},
	});
}
function initBanne1r(clas) {
	var swiper = new Swiper('.BannerWrap', {
		autoplay: true,
		delay: 3000,
		loop: true,
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		on: {
			touchStart: function (swiper, event) {
				api.setFrameAttr({
					bounces: false
				});

			},
			touchEnd: function (swiper, event) {
				//你的事件
				api.setFrameAttr({
					bounces: true
				});
			},
		},

	});
}

function logc(data) {
	console.log(JSON.stringify(data))
}

function loga(data) {
	alert(JSON.stringify(data))
}

function reloadWin(name) {
	api.execScript({
		name: name,
		script: 'window.location.reload()'
	});
}
