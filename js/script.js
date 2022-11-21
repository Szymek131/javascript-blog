'use strict';
{
  const opts = {
    articleSelector: '.post',
    titleSelector: '.post-title',
    titleListSelector: '.titles',
    tagsListSelector: '.tags',
    authorsListSelector: '.authors',
    cloudClassCount: 5,
    cloudClassPrefix: 'tag-size-',
  };

  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;

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

    document.querySelector(opts.titleListSelector).innerHTML = '';


    const articles = document.querySelectorAll(opts.articleSelector + customSelector);
    for(let article of articles){

      const articleId = article.getAttribute('id');
      const articleTitle = article.querySelector(opts.titleSelector).innerHTML;
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

  const calculateParams = function(subject){
    const params = {};
    params.max = 0;
    params.min = 99999;

    for(let tag in subject){

      params.max = Math.max(subject[tag], params.max);
      params.min = Math.min(subject[tag], params.min);
    }

    return params;
  };

  const calculateTagClass = function(count, params) {

    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor( percentage * (opts.cloudClassCount - 1) + 1 );

    return(opts.cloudClassPrefix + classNumber);
  };


  calculateTagClass(opts.cloudClassPrefix, opts.cloudClassCount);
  const generateTags = function() {

    let allTags = {};
    const articles = document.querySelectorAll(opts.articleSelector);

    for(let article of articles){
      const tagsWrapper = article.querySelector('.post-tags .list');
      const articleTags = article.getAttribute('data-tags');
      const articleTagsArray = articleTags.split(' ');

      for(let tag of articleTagsArray){

        const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';

        tagsWrapper.insertAdjacentHTML('beforeend', linkHTML);

        if(!allTags[tag]) {
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
      }

    }
    const tagList = document.querySelector(opts.tagsListSelector);
    const tagsParams = calculateParams(allTags);
    let allTagsHTML = '';

    for(let tag in allTags){
      allTagsHTML += '<a class="'+ calculateTagClass(allTags[tag], tagsParams) + '"href="#tag-' + tag + '"> ' + tag + ' (' + allTags[tag] + ')</a>';
    }
    tagList.innerHTML = allTagsHTML;
  };

  generateTags();

  const tagClickHandler = function(event){
    event.preventDefault();
    if(this.getAttribute('href').startsWith('#auth-')){
      return ;
    }

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
    let allAuthors = {};
    const articles = document.querySelectorAll(opts.articleSelector);
    for(let article of articles){
      const authorWrapper = article.querySelector('.post-title');
      const getAuthor = article.getAttribute('data-author');
      const authorLink = '<a href="#author-' + getAuthor + '">' + getAuthor + '</a>';

      if(!allAuthors[getAuthor]){
        allAuthors[getAuthor] = 1;
      } else {
        allAuthors[getAuthor]++;
      }

      authorWrapper.insertAdjacentHTML('afterend', authorLink);
    }
    const authorList = document.querySelector(opts.authorsListSelector);
    const authorsParams = calculateParams(allAuthors);
    let allAuthorsHTML = '';

    for(let getAuthor in allAuthors){
      allAuthorsHTML += '<a class="'+ calculateTagClass(allAuthors[getAuthor], authorsParams) + '"href="#tag-' + getAuthor + '"> ' + getAuthor + ' (' + allAuthors[getAuthor] + ')</a>';
    }

    authorList.innerHTML = allAuthorsHTML;
  };
  generateAuthors();

  const authorClickHandler = function(event){
    event.preventDefault();
    if(this.getAttribute('href').startsWith('#tag-')){
      return;
    }
    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const author = href.replace('#author-', '');
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
