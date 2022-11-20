'use strict';
{

  const optArticleSelector = '.post';
  const optTitleSelector = '.post-title';
  const optTitleListSelector = '.titles';
  const optTagsListSelector = '.tags';
  const optAuthorsListSelector = '.authors';
  const optCloudClassCount = 5;
  const optCloudClassPrefix = 'tag-size-';

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

  const calculateTagsParams = function(tags){
    const params = {};
    params.max = 0;
    params.min = 99999;
    console.log(params);

    for(let tag in tags){
      console.log(tag + ' is used ' + tags[tag] + ' times');

      params.max = Math.max(tags[tag], params.max);
      console.log(params.max);

      params.min = Math.min(tags[tag], params.min);
      console.log(params.min);
    }

    return params;
  };

  const calculateAuthorsParams = function(authors){
    const params = {};
    params.max = 0;
    params.min = 99999;
    console.log(params);

    for(let author in authors){
      console.log(author + ' is used ' + authors[author] + ' times');

      params.max = Math.max(authors[author], params.max);
      console.log(params.max);

      params.min = Math.min(authors[author], params.min);
      console.log(params.min);
    }

    return params;
  };

  const calculateTagClass = function(count, params) {

    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );

    return(optCloudClassPrefix + classNumber);
  };


  calculateTagClass(optCloudClassPrefix, optCloudClassCount);
  const generateTags = function() {

    let allTags = {};
    const articles = document.querySelectorAll(optArticleSelector);

    for(let article of articles){

      let html = '';
      const tagsWrapper = article.querySelector('.post-tags .list');
      const articleTags = article.getAttribute('data-tags');
      const articleTagsArray = articleTags.split(' ');

      let tagNum = 0;

      for(let tag of articleTagsArray){

        tag = articleTagsArray[tagNum];
        const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';

        tagNum ++;
        tagsWrapper.insertAdjacentHTML('beforeend', linkHTML);
        html = html + linkHTML;

        if(!allTags[tag]) {
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
        console.log(allTags);
      }

    }
    const tagList = document.querySelector(optTagsListSelector);
    console.log(tagList);
    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams);
    let allTagsHTML = '';

    for(let tag in allTags){
      allTagsHTML += '<a class="'+ calculateTagClass(allTags[tag], tagsParams) + '"href="#tag-' + tag + '"> ' + tag + ' (' + allTags[tag] + ')</a>';
    }
    console.log(allTagsHTML);
    tagList.innerHTML = allTagsHTML;
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
    let allAuthors = {};
    const articles = document.querySelectorAll(optArticleSelector);
    for(let article of articles){
      const authorWrapper = article.querySelector('.post-title');
      const getAuthor = article.getAttribute('data-author');
      const authorLink = '<a href="#auth-' + getAuthor + '">' + getAuthor + '</a>';

      if(!allAuthors[getAuthor]){
        allAuthors[getAuthor] = 1;
      } else {
        allAuthors[getAuthor]++;
      }
      console.log(allAuthors);

      authorWrapper.insertAdjacentHTML('afterend', authorLink);
    }
    const authorList = document.querySelector(optAuthorsListSelector);
    const authorsParams = calculateAuthorsParams(allAuthors);
    console.log('authorParams:', authorsParams);
    let allAuthorsHTML = '';

    for(let getAuthor in allAuthors){
      allAuthorsHTML += '<a class="'+ calculateTagClass(allAuthors[getAuthor], authorsParams) + '"href="#tag-' + getAuthor + '"> ' + getAuthor + ' (' + allAuthors[getAuthor] + ')</a>';
    }

    console.log(allAuthorsHTML);
    authorList.innerHTML = allAuthorsHTML;
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
