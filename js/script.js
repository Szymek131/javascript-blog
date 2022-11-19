'use strict'
{
const titleClickHandler = function(event){
    const clickedElement = this;
    event.preventDefault();
    
    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
    }
    
    clickedElement.classList.add('active');
    
    const activeArticles = document.querySelectorAll('.posts article.active');

    for(let activeArticle of activeArticles){
        activeArticle.classList.remove('active');
    }

    const articleSelector = clickedElement.getAttribute('href');
    const targetArticle = document.querySelector(articleSelector);
    
    targetArticle.classList.add('active');

  }

  const optArticleSelector = '.post';
  const optTitleSelector = '.post-title';
  const optTitleListSelector = '.titles';

  function generateTitleLinks() {
    
    /* [DONE] remove contents of titleList */

    document.querySelector(optTitleListSelector).innerHTML = '';

    /* for each article */

        const articles = document.querySelectorAll(optArticleSelector);

        for(let article of articles){

        /* get the article id */
        const articleId = article.getAttribute('id');
        console.log(articleId);
        /* find the title element */
        const articleTitle = article.querySelector(optTitleSelector).innerHTML;
        console.log(articleTitle);

        /* get the title from the title element */

        /* create HTML of the link */

        const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
        console.log(linkHTML);

        /* insert link into titleList */

        const position = document.querySelector('.titles')
        position.insertAdjacentHTML('beforeend', linkHTML);
    }
    const links = document.querySelectorAll('.titles a');
    console.log(links);

    for(let link of links){
        link.addEventListener('click', titleClickHandler);
    }
  }
  generateTitleLinks();
}