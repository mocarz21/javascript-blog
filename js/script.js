'use strict';
const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
  console.log(event);

  /* [Done] remove class 'active' from all article links  */

  const activeLinks=document.querySelectorAll('.titles a');
  console.log(activeLinks);

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

  /*[Done] find the correct article using the selector (value of 'href' attribute) */

  const correctArticle = document.querySelector(atrybut);

  /* [Done] add class 'active' to the correct article */

  correctArticle.classList.add('active');
};
const links = document.querySelectorAll('.titles a');
console.log('co: ', links);

for(let link of links)
  link.addEventListener('click', titleClickHandler);

function generateTitleLinks(){

  /* [Done]remove contents of titleList */
  const titleSelector= document.querySelector('.titles');
  titleSelector.innerHTML='';
        
  /* for each article */
  const articles= document.querySelectorAll('.post');

  /* get the article id */

  for(let article of articles){
    const articleId= article.getAttribute('id');

    /* find the title element */

    const titleFind=article.querySelector('.post-title');

    /* get the title from the title element */
  
    let titlename= titleFind.innerHTML;
        
    /* create HTML of the link */

    const html ='<li><a href=#'+ articleId +'"><span>'+ titlename + '</span></a></li>';

    /* insert link into titleList */

    /*   
    titleSelector.innerHTML= titleSelector + html;
    */
    titleSelector.insertAdjacentHTML("beforeend", html);
    

    console.log('titlelist: ', titleSelector);

  }

}
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';

function generateTags(){

  /* find all articles */
  const articles=document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for(let article of articles){

    /* find tags wrapper */
    const articleList= article.querySelector(optArticleTagsSelector);
    
    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const dataTags = article.getAttribute('data-tags');
    
    /* split tags into array */
    const arrayDataTags = dataTags.split(' ');

    /* START LOOP: for each tag */
    for(let tag of arrayDataTags){
      
      /* generate HTML of the link */
      const htmlLink = '<li><a href=#tag-' + tag + '><span>' + tag + '</span></a></li>';
      
      /* add generated code to html variable */
      html = html + htmlLink ;
      
      /* END LOOP: for each tag */
    }
 
    /* insert HTML of all the links into the tags wrapper */
    articleList.innerHTML = html;
    console.log('art:', articleList);
    
  /* END LOOP: for every article: */
  }
 
}
generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventdefoult();
  
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getatribute('href');
  console.log('href :' + href);
  
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  
  /* find all tag links with class active */
  const activeLinks = document.querySelectorAll('a.active[href^=#tag-"]');
   
  /* START LOOP: for each active tag link */
  for(let activeLink of activeLinks){
 
    /* remove class active */
    activeLink.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
   
  /* find all tag links with "href" attribute equal to the "href" constant */
  tagHrefLinks = document.querySelectorAll('a[href="' + href + '"]');
   
  /* START LOOP: for each found tag link */
  for(let tagHrefLink of tagHrefLinks){
 
    /* add class active */
    tagHrefLink.classList.add('active');
 
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
   
  function addClickListenersToTags(){
    /* find all links to tags */
   
    /* START LOOP: for each link */
   
    /* add tagClickHandler as event listener for that link */
   
    /* END LOOP: for each link */
}
}   
 addClickListenersToTags();
