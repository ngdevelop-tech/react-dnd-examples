import {  Link, Outlet,  } from 'react-router-dom';


export const PagesRoot = ()=> {
    return  <div className="pages-root">
        <nav >
            <ul>
                <li><Link to={'/simple'} > Simple  </Link></li>
                <li><Link to={'/single-list'} > Single List  </Link></li>
            </ul>
        </nav>

        <section className='pages-outlet'>
            <Outlet />
        </section>
    </div>
    
}