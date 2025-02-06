import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatButton,
    MatIcon,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
