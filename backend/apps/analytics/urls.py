from django.urls import path
from . import views

app_name = 'analytics'

urlpatterns = [
    path('track/pageview/', views.track_pageview, name='track-pageview'),
    path('track/event/', views.track_event, name='track-event'),
    path('track/batch/', views.track_batch, name='track-batch'),
    path('dashboard/', views.dashboard_stats, name='dashboard'),
    path('pageviews/', views.page_views_list, name='pageviews'),
    path('top-pages/', views.top_pages, name='top-pages'),
    path('top-referrers/', views.top_referrers, name='top-referrers'),
    path('events/', views.events_list, name='events'),
    path('events/breakdown/', views.event_breakdown, name='event-breakdown'),
]
