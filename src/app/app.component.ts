import { Component } from '@angular/core';
import { YoutubeService } from './@service/youtube.service';
import { DomSanitizer } from '@angular/platform-browser';

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
	videos:any = [];

  constructor(
  	private youtubeService: YoutubeService,
  	private domSanitizer: DomSanitizer
  )
  {
  	this.getYoutubeListSearch();
  }

  viewVideo(id){
		this.viewVideoOk = true;
		this.downloadOk = false;
  	this.videoId = id;
  	this.videoUrl = this.getEmbedUrl(id);
  	this.getYoutubeVideoInfo(id);
  }

  download(id){
		this.viewVideoOk = false;
		this.downloadOk = true;
  	this.getYoutubeVideoInfo(id);
  	this.getDownloadMp3(id);
  }

	getEmbedUrl(id){
		return this.domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+id+'?rel=0&amp;autoplay=1');
	}

  getYoutubeListSearch() 
  {this.search ='AnoHana Secret base Ending. sub español';
  		console.log(this.search);
  	this.youtubeService.getYoutubeListSearch(this.search)
	    .subscribe((data) => 
	    {
	      this.videos = data.items;
	      console.log(data);
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
	      
	      console.log(data);
	    }, error => {
	      console.log(error);
	    });
  }

}
