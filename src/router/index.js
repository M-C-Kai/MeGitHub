import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home/Home'
import Movie from '@/components/Movie/Movie'
import Book from '@/components/Book/Book'
import Pic from '@/components/Pic/Pic'
import LookPic from '@/components/Pic/LookPic'
import Bookcommon from '@/components/Book/Bookcommon'
import LookBook from '@/components/Book/LookBook'
import Moviecommon from '@/components/Movie/Moviecommon'
import Piccommon from '@/components/Pic/Piccommon'

Vue.use(Router)

export default new Router({
  linkActiveClass:'link-active',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Movie',
      name: 'Movie',
      component: Movie
    },
    {
      path: '/Book',
      name: 'Book',
      component: Book
    },

    //dm
    {
      path: '/Pic',
      name: 'Pic',
      component: Pic
    },    
    {
      path: '/Piccommon/:id',
      name: 'Piccommon',
      component:Piccommon
    },
    {
      path: '/LookPic/id/num',
      name: 'LookPic',
      component: LookPic
    },

    //xs
    {
      path: '/Bookcommon',
      name: 'Bookcommon',
      component:Bookcommon
    },
    {
      path: '/LookBook/id/num',
      name: 'LookBook',
      component:LookBook
    },
    {
      path: '/Moviecommon/:id',
      name: 'Moviecommon',
      component:Moviecommon
    },

    
  ]
})
