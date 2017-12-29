import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class YoutubeService{

  API_ENDPOINT = 'https://www.googleapis.com/youtube/v3/search?';

  constructor(private http: Http)
  {
  }

  public getYoutubeListSearch(query){          
    return this.http.get(this.API_ENDPOINT+'part=snippet&maxResults=30&order=viewCount&q=' + query + '&type=video&videoDefinition=any&key=AIzaSyD8KtrA3UwaI4wDZ6nxe4WOzqNfWxxjts4')
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getYoutubeVideoInfo(id){          
    return this.http.get('https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=' + id + '&key=AIzaSyD8KtrA3UwaI4wDZ6nxe4WOzqNfWxxjts4')
      .map(this.extractData)
      .catch(this.handleError);
  }


  public getDownloadMp3(id){          
    return this.http.get('https://youtubetoany.com/@api/json/mp3/' + id)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(response: Response) {
      let body = response.json();
      return body || {};
  }

  private handleError(error: any) {
      let errMsg = (error.message) ? error.message :
          error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg);
      return Observable.throw(errMsg);
  }
  
}