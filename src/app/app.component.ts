import { Component } from '@angular/core';
import { YoutubeService } from './@service/youtube.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

	viewVideoOk:boolean = false;
	downloadOk:boolean = false;
	videoId:any = "";
	videoUrl:any = "";
	videoImageMedium:any = "";
	videoTitle:any = "";
	videoChannelTitle:any = "";
	videoDescription:any = "";
	videoDuration:any = "";
	videoLikes:any = "";
	videoDislikes:any = "";
	videoViews:any = "";
	search:any ="";
	videosDefault:any = [];
	videosSearch:any = [];
	mp3Downloads:any = [];
	videosDownloads:any = [];
	onlyMp3Downloads:any = [];
	onlyVideosDownloads:any = [];

  constructor(
  	private youtubeService: YoutubeService,
  	private domSanitizer: DomSanitizer,
  	private router: Router
  )
  {
  	this.getYoutubeListDefault();
  }

  viewVideo(id){
		this.viewVideoOk = true;
		this.downloadOk = false;
  	this.videoId = id;
  	this.videoUrl = this.getEmbedUrl(id);
  	this.getYoutubeVideoInfo(id);
  }

  stopViewVideo(){
		this.viewVideoOk = false;
		this.downloadOk = false;
  	this.videoId = "";
  }

  download(id){
		this.viewVideoOk = false;
		this.downloadOk = true;
  	this.mp3Downloads=[];
  	this.videosDownloads=[];
  	this.getYoutubeVideoInfo(id);
  	this.getDownloadMp3(id);
  	this.getDownloadVideos(id);
  }

	getEmbedUrl(id){
		return this.domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+id+'?rel=0&amp;autoplay=1');
	}

	getYoutubeListDefault(){
		this.youtubeService.getYoutubeListSearch('', 30)
  	.subscribe((data) => 
	    {
	      this.videosDefault = data.items;
	    }, error => {
	      console.log(error);
	    });
	}
  getYoutubeListSearch() 
  { 
		this.videosSearch = [];
  	this.youtubeService.getYoutubeListSearch(this.search, 30)
  	.subscribe((data) => 
	    {
	    	if (this.search.length) {
	      	this.videosSearch = data.items;
	    	}
	    }, error => {
	      console.log(error);
	    });
  }

  getYoutubeVideoInfo(id) 
  {
  	this.youtubeService.getYoutubeVideoInfo(id)
	    .subscribe((data) => 
	    {
	      let duration = data.items[0].contentDetails.duration;
	      duration = duration.replace('S', '');
	      duration = duration.replace('M', ':');
	      duration = duration.replace('H', ':');
	      duration = duration.replace('PT', '');

	      this.videoImageMedium = data.items[0].snippet.thumbnails.medium.url;
	      this.videoChannelTitle = data.items[0].snippet.channelTitle;
	      this.videoTitle = data.items[0].snippet.title;
	      this.videoDescription = data.items[0].snippet.description;
	      this.videoDuration = duration;
	      this.videoLikes = data.items[0].statistics.likeCount;
	      this.videoDislikes = data.items[0].statistics.dislikeCount;
	      this.videoViews = data.items[0].statistics.viewCount;
	    }, error => {
	      console.log(error);
	    });
  }

  getDownloadMp3(id){
		this.youtubeService.getDownloadMp3(id)
      .subscribe((data) => 
		    {
		    	let stringJson = data.slice(0,-38231);
					let json = JSON.parse(stringJson);
		      this.mp3Downloads = Object.keys(json.vidInfo).map((key)=>{ return json.vidInfo[key]});
		    }, error => {
		      console.log(error);
		    });
  }

  getDownloadVideos(id){
		this.youtubeService.getDownloadVideos(id)
      .subscribe((data) => 
		    {
		    	let stringJson = data.slice(0,-38231);
					let json = JSON.parse(stringJson);
		      this.videosDownloads = Object.keys(json.vidInfo).map((key)=>{ return json.vidInfo[key]});

		      console.log(this.videosDownloads);
		    }, error => {
		      console.log(error);
		    });
  }


  

}
