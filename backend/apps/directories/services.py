from apps.directories.models import DirectoryEntry


def create_directory_entry(title: str, slug: str, description: str, website_url: str, **kwargs) -> DirectoryEntry:
    return DirectoryEntry.objects.create(
        title=title,
        slug=slug,
        description=description,
        website_url=website_url,
        **kwargs
    )