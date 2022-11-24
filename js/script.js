'use strict';
{
  const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
    authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
    authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML)
  };

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
      const linkHTMLData = {id: articleId, title: articleTitle};
      const linkHTML = templates.articleLink(linkHTMLData);
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

  const calculateClass = function(count, params) {

    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor( percentage * (opts.cloudClassCount - 1) + 1 );

    return(opts.cloudClassPrefix + classNumber);
  };


  calculateClass(opts.cloudClassPrefix, opts.cloudClassCount);
  const generateTags = function() {

    let allTags = {};
    const articles = document.querySelectorAll(opts.articleSelector);

    for(let article of articles){
      const tagsWrapper = article.querySelector('.post-tags .list');
      const articleTags = article.getAttribute('data-tags');
      const articleTagsArray = articleTags.split(' ');

      for(let tag of articleTagsArray){

        const linkHTMLData = {tag: tag};
        const linkHTML = templates.tagLink(linkHTMLData);

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
    const allTagsData = {tags: []};

    for(let tag in allTags){
      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateClass(allTags[tag], tagsParams)
      });
    }
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
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
      const postTitle = article.querySelector(opts.titleSelector);
      const authorName = article.getAttribute('data-author');
      const authorHTMLData = {author: authorName};
      const authorLink = templates.authorLink(authorHTMLData);

      if(!allAuthors[authorName]){
        allAuthors[authorName] = 1;
      } else {
        allAuthors[authorName]++;
      }

      postTitle.insertAdjacentHTML('afterend', authorLink);
    }
    const authorList = document.querySelector(opts.authorsListSelector);
    const authorsParams = calculateParams(allAuthors);
    const allAuthorsData = {authors: []};

    for(let authorName in allAuthors){
      allAuthorsData.authors.push({
        author: authorName,
        count: allAuthors[authorName],
        className: calculateClass(allAuthors[authorName], authorsParams)
      });
    }
    authorList.innerHTML = templates.authorCloudLink(allAuthorsData);
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
    const activeAuthor = document.querySelectorAll('.post a, .authors a');

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
    const links = document.querySelectorAll('.post a, .authors a');

    for(let link of links){
      link.addEventListener('click', authorClickHandler);
    }
  };
  addClickListenersToAuthors();
}
