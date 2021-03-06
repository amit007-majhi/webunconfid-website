import {render,html} from '../node_modules/lit-html/lit-html.js'; 
import TImg from './t-img.js';
import TOrganizers from './t-organizers.js';
import TParticipants from './t-participants.js';
import TCommunities from './t-communities.js';
import { register } from '../node_modules/register-service-worker/index.js'


customElements.define('t-img', TImg);
customElements.define('t-organizers', TOrganizers);
customElements.define('t-participants', TParticipants);
customElements.define('t-communities', TCommunities);

export class TApp extends HTMLElement {
    constructor(){
        super();
        this._shadowRoot=this.attachShadow({mode: 'open'});
        this._shadowRoot.innerHTML=this.template;
    }  

    static get observedAttributes() {return ['active']; }

    render(){
        render(this.template,this._shadowRoot);
    }

    attributeChangedCallback(name, oldValue, newValue){
        if(name==='active'){
            this.scrollTo(newValue);
        }
        this.render();
    }

    connectedCallback(){
        this.render();
        this.scrollTo(this.getAttribute('active'));
        register('/service-worker.js', {
            ready (registration) {
            console.log('Service worker is active.')
            },
            registered (registration) {
            console.log('Service worker has been registered.')
            },
            cached (registration) {
            console.log('Content has been cached for offline use.')
            },
            updatefound (registration) {
            console.log('New content is downloading.')
            },
            updated (registration) {
            console.log('New content is available; please refresh.')
            },
            offline () {
            console.log('No internet connection found. App is running in offline mode.')
            },
            error (error) {
            console.error('Error during service worker registration:', error)
            }
        });
    }

    get template(){
        return html`
        <style>
            :host{
                display:block;
                margin:0;
                padding:0;
            }

            a{
                text-decoration:none;
            }

            
            #featured-image{
                background: url(../img/webunconf18_800.jpg) no-repeat center center fixed;
                background-size: cover;
                height: 100vh;
                margin-bottom:5rem;
                color:#FFF;
                position:relative;

                display: flex;
                align-items: center;
                justify-content: center;
            }
            #arrow-down{
                display: none;
            }
            #featured-image .dark-bg{
                position:absolute;
                top:0;
                bottom:0;
                right:0;
                left:0;
                background-color:#000;
                opacity:0.5;
            }
            #featured-image .content{
                position:relative;
                text-align:center;
                margin:0 auto;
                width:80%;
                // top:20%;
                font-size:1.2em;
            }
            #featured-image .venue{
                font-size:0.8em;
            }
            header{
                margin:16px;
            }

           .block-content{
               margin:0 auto 8rem auto;
               padding:0 1rem;
               max-width:960px;
           }
           
           .block-content h2{
               width:100%;
           }

            .app-container{
                text-align:center; 
            }

                
        
            
            #sponsor-list{
                display:flex;
                flex-direction:row;
                flex-wrap:wrap;
                justify-content:center;
                align-content:center;
            }
            #sponsor-list t-img{
                width:320px;
                height:320px;
            }

            .block-content ul{
                column-count:3;
                padding: 0;
                margin:0;
            }
            .block-content ul li{
                list-style-type:none;
                margin-bottom:1em;
            }

            

            /* Larger than mobile screen */
            @media (min-width: 40.0rem) {
                #featured-image{
                    background: url(../img/webunconf18.jpg) no-repeat center center fixed;
                    
                }
                #community-list, #sponsor-list,#venue{
                    flex-direction:row;
                }
                

                #venue t-img{
                    height:300px;
                }
                
    
            }


        </style>
        <div class="app-container">
            <div id="featured-image">
                <div class="dark-bg"></div>
                <a id="arrow-down" href="#main-content" @click=${(e) => this.scrollTo(e,'#tentang')}>&#8964;</a>
                <div class="content">
                    <h1>WebUnconf 2019</h1>
                    <h4>Web Community Leaders Bootcamp</h4>
                    <p>Batu, 30 November-1 December 2019</p>
                    <div class="venue">
                    
                    </div>
                </div>
            </div>
            <div id="main-content">
                <div id="tentang" class="block-content">
                    <h2>Bootcamp Untuk Aktivis Komunitas Pengembang Web Indonesia</h2>
                    <article>
                    <p>Indonesia adalah negara besar dengan pertumbuhan industri startup yang sangat cepat. Tapi pertumbuhan ini tidak dibarengi dengan pertumbuhan suplai talenta. Bahkan lulusan universitas belum memenuhi kebutuhan standar industri. Karena itu komunitas di sini memainkan peran yang sangat penting untuk mengembangkan talenta kita dan menyiapkan mereka untuk siap dengan standar industri.
                    </p>
                    <p>Bootcamp ini diperuntukkan untuk kalian yang aktif di komunitas pengembang web Indonesia sehingga kita bisa saling mengenal satu sama lain dan bersama-sama berdiskusi untuk membuat para pengembang web di Indonesia bisa membuat web yang lebih baik.</p>
                    <p>Bootcamp ini adalah yang kedua kalinya setelah tahun lalu kami mengadakan event serupa di Yogyakarta. Dan fokus utama kami untuk tahun ini adalah bagaimana komunitas web bisa bersama-sama meningkatkan kemampuan dan produktifitas anggota komunitasnya.</p>
                    </article>
                </div>
                <div id="last-event" class="block-content">
                    <h3>WebUnconf 2018</h3>
                    <article>
                    <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/tfSXwOkpGu0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </article>
                </div>
                <div id="venue-content" class="block-content">
                    <h2>Lokasi</h2>
                    <div id="venue">
                        <article>
                            <h4>Batu, Malang</h4>
                            <p>Venue masih dalam konfirmasi.</p>
                        </article>
                    </div>
                </div>
                <div id="footer" class="block-content">
                    <p>Develop by <a href="//github.com/tyohan">@tyohan</a>,<a href="//github.com/ri7nz">@ri7nz</a> and <a href="//github.com/satyakresna">@satyakresna</a>. Available in our <a href="//github.com/w3id/webunconfid-website">Github</a>.</p>
                    <p>Join our <a href="https://t.me/wwwid_pwa">group discussion</a> and read our <a href="https://medium.com/wwwid">publication</a></p>
                </div>
            </div>
        </div>
        `;
    }

    scrollTo(selector){
        if(selector.length>0){
            const el=this._shadowRoot.querySelector(selector);
            if(el!==null){
                el.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
        
    }
}

customElements.define('t-app',TApp);
