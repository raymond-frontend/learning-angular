import { Subject } from "rxjs";
import { Post } from "./../model/post";
import { environment } from "./../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { takeUntil, map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class PostService {
  posts: Post[] = [];
  backendURL = environment.backendAPI;
  destroy$: Subject<boolean> = new Subject<boolean>();
  private postsUpdated = new Subject<{ posts: Post[]; postsCount: number }>();
  constructor(private http: HttpClient) {}

  getPosts() {
    this.http
      .get<{ count: string; posts: any }>(`${this.backendURL}/posts`)
      .pipe(
        map((postData) => {
          return {
            posts: postData.posts.map((post) => {
              return {
                text: post.text,
                id: post._id,
                creator: post.user,
                avatar: post.avatar,
                likes: post.likes,
                comments: post.comments,
                date: post.date,
              };
            }),
            count: postData.count,
          };
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((res) => {
        this.posts = res.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postsCount: +res.count,
        });
      });
  }

  getPostsUpdateListener() {
    return this.postsUpdated.asObservable();
  }
}