import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../model/user.model';
import {ApiService} from '../core/api.service';

@Component({
    selector: 'app-list-user',
    templateUrl: './list-user.component.html',
    styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

    users: any;

    constructor(private router: Router, private apiService: ApiService) {
    }

    ngOnInit() {
        if (!window.sessionStorage.getItem('token')) {
            this.router.navigate(['login']);
            return;
        }
        this.apiService.getUsers()
            .subscribe(data => {
                console.log(data);
                this.users = data;
            });
    }

    deleteUser(user: User): void {
        this.apiService.deleteUser(user.id)
            .subscribe(data => {
                this.users = this.users.filter(u => u !== user);
            });
    }

    editUser(user: User): void {
        window.sessionStorage.removeItem('editUserId');
        window.sessionStorage.setItem('editUserId', user.id.toString());
        this.router.navigate(['edit-user']);
    }

    addUser(): void {
        this.router.navigate(['add-user']);
    }
}
