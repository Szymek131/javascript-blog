'use strict';
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

  };

  const generateTitleLinks = function(customSelector = '') {

    document.querySelector(optTitleListSelector).innerHTML = '';


    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    console.log(articles);
    for(let article of articles){

      const articleId = article.getAttribute('id');
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      const titlesSelector = document.querySelector('.titles');

      titlesSelector.insertAdjacentHTML('beforeend', linkHTML);
    }

    const links = document.querySelectorAll('.titles a');


    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  };
  generateTitleLinks();

  const generateTags = function() {

    const articles = document.querySelectorAll(optArticleSelector);
    for(let article of articles){


      let html = '';
      const tagsWrapper = article.querySelector('.post-tags .list');
      const articleTags = article.getAttribute('data-tags');
      const articleTagsArray = articleTags.split(' ');

      let tagNum = 0;

      for(let tag of articleTagsArray){

        tag = articleTagsArray[tagNum];
        const tagLink = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';

        tagNum ++;
        tagsWrapper.insertAdjacentHTML('beforeend', tagLink);
        html = html + tagLink;
      }

      tagsWrapper.innerHTML = html;

    }
  };

  generateTags();

  const tagClickHandler = function(event){
    if(this.getAttribute('href').slice(0,5) !== '#tag-'){
      return 0;
    }
    event.preventDefault();

    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const tag = href.replace('#tag-', '');
    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

    for(let link of activeTags){
      link.classList.remove('active');
    }
    const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

    for(let tag of tagLinks){
      tag.classList.add('active');
    }
    generateTitleLinks('[data-tags~="' + tag + '"]');

  };

  const addClickListenersToTags = function(){
    const links = document.querySelectorAll('.post-tags .list li a');
    for(let link of links){
      link.addEventListener('click', tagClickHandler);
    }
  };

  addClickListenersToTags();

  const generateAuthors = function(){
    const articles = document.querySelectorAll(optArticleSelector);

    for(let article of articles){
      const authorWrapper = article.querySelector('.post-title');
      const getAuthor = article.getAttribute('data-author');
      const authorLink = '<a href="#auth-' + getAuthor + '">' + getAuthor + '</a>';

      authorWrapper.insertAdjacentHTML('afterend', authorLink);
    }
  };
  generateAuthors();

  const authorClickHandler = function(event){
    if(this.getAttribute('href').slice(0,6) !== '#auth-'){
      return 0;
    }
    event.preventDefault();
    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const author = href.replace('#auth-', '');
    const activeAuthor = document.querySelectorAll('.post a');

    for(let link of activeAuthor){
      link.classList.remove('active');
    }

    const authorLinks = document.querySelectorAll('a[href="' + href + '"]');

    for(let author of authorLinks){
      author.classList.add('active');
    }

    generateTitleLinks('[data-author="' + author + '"]');
  };

  const addClickListenersToAuthors = function(){
    const links = document.querySelectorAll('.post a');

    for(let link of links){
      link.addEventListener('click', authorClickHandler);
    }
  };
  addClickListenersToAuthors();
}
