mini SPA sample

header title's anchor is not ajax request.

if want to ajax, execute following code at console.

```
document.querySelector('header h1 a').addEventListener('click', function(e){
  e.preventDefault();
  history.pushState(null, null, '/');
  pageLoad();
});
```
