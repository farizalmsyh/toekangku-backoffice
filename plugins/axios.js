export default function ({ $axios, redirect, app }) {
  $axios.onRequest(config => {
    if (localStorage.getItem('token')) {
      config.headers.common['Authorization'] = `${localStorage.getItem('token')}`;
    }
  })
  $axios.onError(error => {
    let url = app.router.currentRoute.path
    let status = error?.response?.status; 
    if(status === 401) {
      redirect(`/login?returnUrl=${url}`)
    } else {
      console.log(error)
    }
  })
}