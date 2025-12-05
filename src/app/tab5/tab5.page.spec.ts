import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Tab5Page } from './tab5.page';
import { provideRouter } from '@angular/router';   // ⭐ modern Angular routing provider

describe('Tab5Page', () => {
  let component: Tab5Page;
  let fixture: ComponentFixture<Tab5Page>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tab5Page],          // standalone components go in imports
      providers: [provideRouter([])] // ⭐ provides ActivatedRoute, RouterLink, etc.
    }).compileComponents();

    fixture = TestBed.createComponent(Tab5Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});