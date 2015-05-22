
var userList   = undefined;
var userDetail = undefined;

var getURL = function getURL(URL, type) {
  var requestType = type === 'json' ? 'application/json'
                                      : 'text/html';
  return new Promise(function (resolve, reject) {
    var req = new XMLHttpRequest();
    req.open('GET', URL, true);
    req.setRequestHeader("Accept", requestType);
    req.onload = function () {
      if (req.status === 200) {
        resolve(req.responseText);
      } else {
        reject(new Error(req.statusText));
      }
    };
    req.onerror = function () {
      reject(new Error(req.statusText));
    };
    req.send();
  });
}

var getList = function(){
  if ( userList != undefined ) return Promise.resolve();
  return getURL('/users', 'json').then(function(response){
    userList = JSON.parse(response).list;
  });
};

var getDetail = function(){
  var id = location.pathname.match(/[0-9].*/)[0];
  return getURL('/users/'+id, 'json').then(function(response){
    userDetail = JSON.parse(response);
  });
};

var setEvent = function(dom, id){
  return dom.addEventListener('click', function(){
    history.pushState(null, null, '/users/'+id);
    pageLoad();
  });
};

var renderList = function(){
  return new Promise(function(resolve, reject){
    if( userList == undefined ) reject();
    var dom = userList.reduce(function(doms, user){
      var li = document.createElement('li');
      li.innerHTML = user.name;
      setEvent(li, user.modelId);
      doms.appendChild(li);
      return doms;
    }, document.createDocumentFragment());

    var ul = document.querySelector('#user-list ul');
    ul.innerHTML = '';
    ul.appendChild(dom);
    resolve();
  });
};

var renderDetail = function(){
  return new Promise(function(resolve, reject){
    if( userDetail == undefined ) reject();
    var detailArea = document.querySelector('#user-detail');
    var df = document.createDocumentFragment();
    var h1 = document.createElement('h1');
    h1.innerHTML = userDetail.name;
    df.appendChild(h1);
    var p = document.createElement('p');
    p.innerHTML = 'Address: ' + userDetail.address;
    df.appendChild(p);

    detailArea.innerHTML='';
    detailArea.appendChild(df);

    resolve();
  });
};

var renderStab = function(){
  return getURL('/stab.html', 'html').then(function(response){
    var detailArea = document.querySelector('#user-detail');
    detailArea.innerHTML = response;
  });
};

var router = [
  {path: /^\/$/,               task: [getList, renderList, renderStab]},
  {path: /^\/users$/,          task: [getList, renderList, renderStab]},
  {path: /^\/users\/[0-9].*$/, task: [getList, renderList, getDetail, renderDetail]},
];

var pageLoad = function(){
  var path = location.pathname;
  var route = _.find(router, function(r){
    return path.match(r.path);
  });
  route.task.reduce(function(r,t){
    return r.then(t);
  }, Promise.resolve());
};

window.addEventListener('popstate', function(ev){
  pageLoad();
}, false);

pageLoad();

