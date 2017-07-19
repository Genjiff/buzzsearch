# pip install flask, twitter-application-only-auth, requests
# no terminal execute:
# $ export FLASK_APP=run.py
# para rodar o servidor execute:
# $ flask run
from flask import Flask, render_template
from application_only_auth import Client
import json
import requests
from urllib.parse import quote
app = Flask(__name__)

@app.route("/")
def hello():
    CONSUMER_KEY = 'sbmaTK8blnFbLo4FeDxe6HkDm'
    CONSUMER_SECRET = 'aRgoP3t1BOs322MXDbyaVABH5Vfqjy44bKwur2r8UPkb6Ij1pH'

    client = Client(CONSUMER_KEY, CONSUMER_SECRET)
    tweets = client.request('https://api.twitter.com/1.1/search/tweets.json?q=%23python&result_type=recent')
    tweet_text = ""
    for tweet in tweets['statuses']:
        url = "https://twitter.com/{0}/status/{1}".format(tweet['user']['screen_name'], tweet['id_str'])
        url = quote(url, safe='')
        r = requests.get('https://publish.twitter.com/oembed?url=' + url)
        txt = json.loads(r.text)
        tweet_text += txt['html']
    return tweet_text
