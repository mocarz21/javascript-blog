'use strict';
const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
  console.log(event);

  /* [Done] remove class 'active' from all article links  */

  const activeLinks=document.querySelectorAll('.titles a');
  console.log(activeLinks)

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
  /* get the article id */
  /* find the title element */
  /* get the title from the title element */
  const articles= document.querySelectorAll('.post');

  for(let article of articles){
    const articleId= article.getAttribute('id');
    const titleFind=article.querySelector('.post-title');
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
  const articles=document.querySelectorAll('.post-title')
  console.log('article :', articles)

  /* START LOOP: for every article: */
  for(article of articles){
      let articleT=article
  }
  /* find tags wrapper */

  /* make html variable with empty string */

  /* get tags from data-tags attribute */

  /* split tags into array */

  /* START LOOP: for each tag */

  /* generate HTML of the link */

  /* add generated code to html variable */

  /* END LOOP: for each tag */

  /* insert HTML of all the links into the tags wrapper */

/* END LOOP: for every article: */
}
  
generateTags();