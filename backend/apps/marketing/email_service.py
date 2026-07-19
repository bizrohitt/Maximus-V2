from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.conf import settings
from apps.marketing.models import EmailCampaign, Subscriber


def send_campaign_email(campaign: EmailCampaign):
    """Send campaign to all active subscribers."""
    subscribers = Subscriber.objects.filter(is_active=True)
    
    sent_count = 0
    for subscriber in subscribers:
        context = {
            'name': subscriber.name or 'there',
            'content': campaign.content,
        }
        
        html_message = render_to_string('emails/campaign.html', context)
        
        send_mail(
            subject=campaign.subject,
            message=campaign.content,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[subscriber.email],
            html_message=html_message,
            fail_silently=True
        )
        sent_count += 1
    
    campaign.recipients_count = sent_count
    campaign.save()
    return sent_count