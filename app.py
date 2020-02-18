from flask import Flask, render_template,request

# Newspaper Module -Used for Article Extraction

import nltk
from newspaper import Article


app=Flask(__name__)

@app.route('/',methods=['GET','POST'])
def index():
    return render_template("index.html")
@app.route('/home',methods=['GET','POST'])
def home():
    
    if request.method=="POST" :
        url=request.form['url']
        print(url)
        article = Article(url)

        # # # Do some NLP
        article.download()
        article.parse()
        # nltk.download('punkt')
        # article.nlp()

        # #Get the authors
        # article.authors       

        # #Get the publish date
        # article.publish_date

        # #Get the top image 
        # article.top_image

        # #Get the article text
        # print(article.text)
        fetched_article=(article.text)
        fetched_article=fetched_article.split('\n')
        
        article_title=article.title
        # return render_template("index.html")
        return render_template("index.html",fetched_article=fetched_article,article_title=article_title)
  
    

if __name__=='__main__':
    app.run(debug=True)
