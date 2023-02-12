import { environment } from './../../../environments/environment';
import { RegisterInput } from './../../interface/register-input';
import { LoginInput } from './../../interface/login-input';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

const TOKEN_NAME = environment.tokenName;
const API_BASE_URL = environment.apiBaseUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  login(loginInput: LoginInput): Promise<any> {
    return firstValueFrom(
      this.httpClient.post<any>(`${API_BASE_URL}/token/new`, loginInput)
    );
  }

  register(registerInput: RegisterInput): Promise<any> {
    return firstValueFrom(
      this.httpClient.post<any>(`${API_BASE_URL}/user/register`, registerInput)
    );
  }

  saveToken(token: string): void {
    localStorage.setItem(TOKEN_NAME, token);
  }

  removeToken(): void {
    localStorage.removeItem(TOKEN_NAME);
  }

  getToken(): string | boolean {
    return localStorage.getItem(TOKEN_NAME) || false;
  }

  isLoggedIn(): boolean {
    return this.getToken() !== false;
  }
}
