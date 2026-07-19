from apps.marketing.models import Subscriber, EmailCampaign
from django.utils import timezone


def add_subscriber(email: str, name: str = "") -> Subscriber:
    return Subscriber.objects.get_or_create(
        email=email,
        defaults={"name": name}
    )[0]


def create_campaign(name: str, subject: str, content: str) -> EmailCampaign:
    return EmailCampaign.objects.create(
        name=name,
        subject=subject,
        content=content
    )


def send_campaign(campaign: EmailCampaign):
    """Placeholder for actual email sending logic."""
    active_subscribers = Subscriber.objects.filter(is_active=True)
    campaign.recipients_count = active_subscribers.count()
    campaign.sent_at = timezone.now()
    campaign.save()
    # TODO: Integrate with Django Anymail / SendGrid / Mailgun
    return campaign.recipients_count