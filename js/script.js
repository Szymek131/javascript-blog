'use strict'
{

const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';

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

  const generateTitleLinks = function() {
    
    document.querySelector(optTitleListSelector).innerHTML = '';


    const articles = document.querySelectorAll(optArticleSelector);

    for(let article of articles){

        const articleId = article.getAttribute('id');
        const articleTitle = article.querySelector(optTitleSelector).innerHTML;
        const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
        const titlesSelector = document.querySelector('.titles')
        
        titlesSelector.insertAdjacentHTML('beforeend', linkHTML);
    }
    
    const links = document.querySelectorAll('.titles a');


    for(let link of links){
        link.addEventListener('click', titleClickHandler);
    }
  }
  generateTitleLinks();
}