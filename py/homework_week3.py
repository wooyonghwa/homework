#import library 
import requests
from bs4 import BeautifulSoup
from db import db_insert
from db import db_find_all

#data 요청
headers = {'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
data = requests.get('https://www.genie.co.kr/chart/top200?ditc=D&ymd=20200403&hh=23&rtm=N&pg=1',headers=headers)

soup = BeautifulSoup(data.text, 'html.parser')

# select를 이용해서, tr들을 불러오기
musics = soup.select('#body-content > div.newest-list > div > table > tbody > tr')
for music in musics:
    #랭킹 순위
    a_rank = music.select_one('td:nth-child(2)')
    #음악 이름
    a_title = music.select_one('td.info > a.title.ellipsis')
    #가수 이름
    a_artist = music.select_one('td.info > a.artist.ellipsis') 
    #print(a_rank.text.split()[0],a_title.text.strip(),a_artist.text.strip())
    doc={
        "rank":a_rank.text.split()[0]+"5",
        "title":a_title.text.strip()+"5",
        "artist":a_artist.text.strip()+"5"
    }
    db_insert(doc)

list = db_find_all()
if list is not None:
    for item in list:
        print(item['rank'],item['title'],item['artist'])

