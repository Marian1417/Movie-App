(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&t(i)}).observe(document,{childList:!0,subtree:!0});function n(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function t(e){if(e.ep)return;e.ep=!0;const s=n(e);fetch(e.href,s)}})();const d=document.getElementById("movie-name"),u=document.getElementById("search-btn"),c=document.getElementById("result"),l=()=>{const r=d.value,n=`http://www.omdbapi.com/?t=${r}&apikey=626ff0f7`;r.length<=0?c.innerHTML='<h3 class="msg">Please enter a movie title</h3':fetch(n).then(t=>t.json()).then(t=>{c.innerHTML=`
        <div class="info">
           <img src=${t.Poster} class="poster">
           <div>
               <h2>${t.Title}</h2>
               <div class="details">
              <span>${t.Rated}</span>
               <span>${t.Year}</span>
           </div> 
           <div class="genre">
             <div>${t.Genre.split(",").join()}</div>
           </div>
           <h3>Plot</h3>
           <p>${t.Plot}</p>
           <h3>Cast</h3>
           <p>${t.Actor}</p>
              
        
           
          
           
           
        </div>


        `})};u.addEventListener("click",l);window.addEventListener("load",l);
