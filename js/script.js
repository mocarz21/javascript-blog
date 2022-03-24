const opts = {
  articleSelector : '.post',
  titleSelector : '.post-title',
  titleListSelector : '.titles',
  articleTagsSelector : '.post-tags .list',
  tagsListSelector : '.tags.list',
  authorsListSelector : '.sidebar .authors',
  cloudClassCount : 5,
  cloudClassPrefix :'tag-size-'              

};



'use strict';
const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
  

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

  /*[Done] find the correct article using the selector (value of 'href' attribute) */
  const correctArticle = document.querySelector(atrybut);
  
  /* [Done] add class 'active' to the correct article */

  correctArticle.classList.add('active');
};


function generateTitleLinks(customSeelector=''){
    
  /* [Done]remove contents of titleList */
  const titleSelector= document.querySelector('.titles');
  titleSelector.innerHTML='';

  /* find all the articles and save them to variable: articles */
  const articles= document.querySelectorAll('.post' + customSeelector); //Analiza filtrowania (niewiem co sie zmienilo po dodaniu customSeelector)
  

  let html = '';

  /* for each article */
  for(let article of articles){

    /* get the article id */  
    const articleId= article.getAttribute('id');
    
    /* find the title element */
    const titleFind=article.querySelector('.post-title');

    /* get the title from the title element */
    let titlename= titleFind.innerHTML;
        
    /* create HTML of the link */
    const linkHTML ='<li><a href=#'+ articleId +'><span>'+ titlename + '</span></a></li>';

    /* insert link into html variable */
    html = html + linkHTML;
    
  }
  /*   
    titleSelector.innerHTML= titleSelector + html;
    titleSelector.insertAdjacentHTML("beforeend", html);
    */
  titleSelector.innerHTML = html;
  
  const links = document.querySelectorAll('.titles a');
 
  
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
    
  }
}
generateTitleLinks();


/*sprawdzanie*/

/*sprawdzanie*/



const calculateTagsParams = function(tags){
  const params = {max: 0 , min: 999999 };
  for(let tag in tags ){
    //console.log(tag  + ' is used ' + tags[tag] + ' times');
    params.max = Math.max(tags[tag], params.max);
    params.min = Math.min(tags[tag], params.min);
  }
  return params;
};



const calculateTagClass = function(count , params){

  const normalizedCount = count -params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage*(opts.cloudClassCount - 1) + 1);
  return opts.cloudClassPrefix + classNumber;               //gdzie znajduje się wstwienie tego w cllasList ?

};


function generateTags(){

  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

  /* find all articles */
  const articles=document.querySelectorAll(opts.articleSelector);

  /* START LOOP: for every article: */
  for(let article of articles){

    /* find tags wrapper */
    const articleList= article.querySelector(opts.articleTagsSelector);  // po co ?
    
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
      
      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags[tag]){

        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
        
      }

      /* END LOOP: for each tag */
    }
 
    /* insert HTML of all the links into the tags wrapper */
    articleList.innerHTML = html;
    
    
  /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(opts.tagsListSelector);

  /* [NEW] add html from allTags to tagList */
  // tagList.innerHTML = allTags.join(' ');
  
  /* [NEW] create variable for all links HTML code */
  const tagsParams = calculateTagsParams(allTags);
  
  let allTagsHTML = '';

  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){
    /* [NEW] generate code of a link and add it to allTagsHTML */
    
    //allTagsHTML += '<li><a href=#tag-' + tag + '><span>' + tag + ' (' + allTags[tag] + ') ' + '</span></a></li>'; 
    const tagLinkHTML = '<li><a href=#tag-' + tag + ' class="' +  calculateTagClass(allTags[tag], tagsParams) + '"<span>' +  tag  + '</a></li>';
    allTagsHTML += tagLinkHTML;

    /* [NEW] END LOOP: for each tag in allTags: */
    
  }
  
  /*[NEW] add HTML from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;

}
generateTags();

const tagClickHandler = function (event) {
  /* prevent default action for this event */
  event.preventDefault();
  
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  
  
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  
  /* find all tag links with class active */
  const activeLinks = document.querySelectorAll('a.active[href^="#tag-"]');
   
  /* START LOOP: for each active tag link */
  for(let activeLink of activeLinks){
 
    /* remove class active */
    activeLink.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
   
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagHrefLinks = document.querySelectorAll('a[href="' + href + '"]');
   
  /* START LOOP: for each found tag link */
  for(let tagHrefLink of tagHrefLinks){
 
    /* add class active */
    tagHrefLink.classList.add('active');
    
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
};

generateTitleLinks();

const addClickListenersToTags = function(){
/* find all links to tags */
  const allLinks =document.querySelectorAll('a[href^="#tag-"]');          //czemu w console.log nic mi nie pokazuje
  
  /* START LOOP: for each link */
  for(let allLink of allLinks){
        
    /* add tagClickHandler as event listener for that link */
    allLink.addEventListener('click' , tagClickHandler);
    /*console.log('allLinks :' + allLinks);*/                            // czemu nie działa ?
    /* END LOOP: for each link */
  }
};
addClickListenersToTags();






const calculateAuthorsParams = function(authors){
  const params = {max: 0 , min: 999999 };
  for(let author in authors ){
  
    params.max = Math.max(authors[author], params.max);
    params.min = Math.min(authors[author], params.min);
  }
  console.log('max  A' + params.max + '  min  A' + params.min);
  return params;
};

const calculateAutorClass = function(count , params){

  const normalizedCount = count -params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage*(opts.cloudClassCount -1 ) + 1);
  return opts.cloudClassPrefix + classNumber;               //gdzie znajduje się wstwienie tego w cllasList ?

};






const generateAuthors = function(){
  
  /* [NEW] create a new variable allAutors with an empty object !!!!*/
  const allAutors ={};

  /* find all articles */
  const articles = document.querySelectorAll('.post');
 
  

  /* START LOOP: for every article: */
  for(let article of articles){

    /* find tags wrapper */
    const authorWrapper = article.querySelector('article .post-author');  
    /* make html variable with empty string */
    let html ='';

    /* get tags from data-tags attribute */
    let dataAuthor = article.getAttribute('data-author');
    
    /* generate HTML of the link */
    const htmlLink = '<li><a href="#author-' + dataAuthor +'"><span>' + dataAuthor +'</span></a></li>';
    
    /* add generated code to html variable */
    html=html + htmlLink ;

    /* [NEW] check if this link is NOT already in allTags */
    if(!allAutors[dataAuthor]){

      /* [NEW] add tag to allTags object */
      allAutors[dataAuthor] = 1;
    } else {
      allAutors[dataAuthor]++;
      
    }
    
    /* insert HTML of all the links into the tags wrapper */  //??????????????????????????????????
    
    authorWrapper.innerHTML= html;
    
  /* END LOOP: for every article: */
  }
  /* [NEW] find list of author in right column */
  const authorList = document.querySelector(opts.authorsListSelector);

  /* [NEW] add html from allTags to tagList */
  // tagList.innerHTML = allTags.join(' ');
  
  /* [NEW] create variable for all links HTML code */
  const autorParams = calculateAuthorsParams(allAutors);
  
  let allAutorsHTML = '';

  /* [NEW] START LOOP: for each tag in allTags: */
  for(let autor in allAutors){
    /* [NEW] generate code of a link and add it to allTagsHTML */
    console.log('autor : ' + autor);
    //allTagsHTML += '<li><a href=#tag-' + tag + '><span>' + tag + ' (' + allTags[tag] + ') ' + '</span></a></li>'; 
    const autorLinkHTML = '<li><a href="#author-' + autor + '" class="' +  calculateAutorClass(allAutors[autor], autorParams) + '"<span>' +  autor  + '(' + allAutors[autor] + ')' + '</span></a></li>';
    console.log('autor : ' + autorLinkHTML);
    allAutorsHTML += autorLinkHTML;
    console.log(autorLinkHTML);
    /* [NEW] END LOOP: for each tag in allTags: */
  }
  
  authorList.innerHTML = allAutorsHTML;
};
generateAuthors();

const authorClickHandler = function(event){                 
  event.preventDefault();                                 //czemu nie działa ?

  const clickedElement= this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "author" and extract author from the "href" constant */
  const author = href.replace('#author-', '');
  console.log('autor : ' + author);                                                  //czemu console.log nie działa ??
  /* find all autor links with class active */
  const autorLinksActive = document.querySelectorAll('a.active[href^="#author-"]'); //czemu zapis a.active ? nie moze byc .active a[]
  console.log('autor links active : ' + autorLinksActive);
  /* START LOOP: for each active author link */
  for(let authorLinkActive of autorLinksActive){

    /* remove class active */
    authorLinkActive.classList.remove('active');
  }

  /* find all author links with "href" attribute equal to the "href" constant */
  const autorLinks = document.querySelectorAll('a.active[href^="#author-]' + href +'"');
  console.log('autor links: ' + autorLinks);
  /* START LOOP: for each found author link */
  for(let authorLink of autorLinks){

    /* add class active */
    authorLink.classList.add('active');

    /* END LOOP: for each found author link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
  console.log('funkcja :', generateTitleLinks);
};




const addClickListenersToAuthors = function(){

  /* find all links to authors */

  const authorLinks= document.querySelectorAll('.post-author .a');     //jak sprawdzic czy działa ?
  
  /* START LOOP: for each link */
  for(let authorLink of authorLinks){

    /* add authorClickHandler as event listener for that link */
    authorLink.addEventListener('click', authorClickHandler);
    /* END LOOP: for each link */
  }
  
};
addClickListenersToAuthors();
                                        //nie działa filtrowanie autorów  czemu ????


