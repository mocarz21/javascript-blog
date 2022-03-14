'use strict';
const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    console.log(event)

    /* [Done] remove class 'active' from all article links  */

    const activeLinks=document.querySelectorAll('.titles a');

    for(let activeLink of activeLinks )
        activeLink.classList.remove('active');

        /* [Done] add class 'active' to the clicked link */

    clickedElement.classList.add('active');

  /* [Done] remove class 'active' from all articles */
   const activeArticles=document.querySelectorAll('.posts article.active');

  for(let activeArticle of activeArticles)
    activeArticle.classList.remove('active');

  /* [Done] get 'href' attribute from the clicked link */

  let atrybut = clickedElement.getAttribute('href');
  console.log('atrybut: ', atrybut)

  /*[Done] find the correct article using the selector (value of 'href' attribute) */
  const correctArticle = document.querySelector(atrybut)
  console.log('atrybut: ', correctArticle)


  /* [Done] add class 'active' to the correct article */
  correctArticle.classList.add('active');

}



const links = document.querySelectorAll('.titles a');
  
for(let link of links)
    link.addEventListener('click', titleClickHandler);

function generateTitleLinks(){
    /* [Done]remove contents of titleList */
    const titleSelector= document.querySelector('.titles');
        titleSelector.innerHTML='';
        

    /* for each article */
    /* get the article id */
    /* find the title element */
    /* get the title from the title element */
    const articles= document.querySelectorAll('.post')

    for(let article of articles){
        const articleId= article.getAttribute('id');

        const titleFind=article.querySelector('.post-title')
        let titlename= titleFind.innerHTML;
        
    
        /* create HTML of the link */

        const html ='<li><a href="#'+ articleId +'"<span>' + titlename + '</span></a></<li>'
       

        /* insert link into titleList */
        
        /* titleSelector.innerHTML= html + titleSelector; */

        titleSelector.insertAdjacentHTML("beforeend", html);
         console.log('titlelist: ', titleSelector);
    }

}
generateTitleLinks();