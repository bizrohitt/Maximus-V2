'use client'

import Link from 'next/link'
import { ArrowRight, Clock, Play, Tag } from 'lucide-react'
import { Button } from '@/components/ui/Button/Button'

const courses = [
  {
    title: 'AI Content Creation Masterclass',
    description: 'Learn to create blog posts, social media content, and marketing copy using AI tools — from prompt writing to final polish.',
    duration: '2 hours',
    lessons: 8,
    tag: 'Writing',
    tagColor: 'bg-blue-50 text-blue-600',
    href: '#',
    comingSoon: true,
  },
  {
    title: 'YouTube Growth with AI',
    description: 'Complete workflow for growing a YouTube channel with AI — titles, thumbnails, scripts, and SEO optimization.',
    duration: '90 min',
    lessons: 6,
    tag: 'Video',
    tagColor: 'bg-red-50 text-red-600',
    href: '#',
    comingSoon: true,
  },
  {
    title: 'SEO for Content Creators',
    description: 'Master keyword research, on-page SEO, and content optimization using free AI tools — no experience required.',
    duration: '2.5 hours',
    lessons: 10,
    tag: 'SEO',
    tagColor: 'bg-green-50 text-green-600',
    href: '#',
    comingSoon: true,
  },
  {
    title: 'Faceless Social Media Brand',
    description: 'Build a profitable social media presence without showing your face — complete guide with AI workflows.',
    duration: '1.5 hours',
    lessons: 7,
    tag: 'Strategy',
    tagColor: 'bg-purple-50 text-purple-600',
    href: '#',
    comingSoon: true,
  },
]

export function MiniCoursesContent() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary grid-lines py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 md:px-4 py-2 rounded-full bg-secondary/10 text-xs md:text-sm font-medium text-secondary mb-4 md:mb-6">
              <Play size={14} />
              Free mini courses
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4 md:mb-5">
              Learn AI, step by step
            </h1>
            <p className="text-base md:text-xl text-text-secondary leading-relaxed">
              Short, actionable courses to help you master AI tools for content, marketing, and growth — completely free.
            </p>
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="py-10 md:py-16 bg-gray-50 grid-lines">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 gap-5 md:gap-6">
            {courses.map((course) => (
              <div
                key={course.title}
                className="group relative p-5 md:p-6 rounded-2xl border border-border bg-primary hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${course.tagColor}`}>
                    {course.tag}
                  </span>
                  {course.comingSoon && (
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-text-muted">
                      Coming Soon
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-text-primary mb-2 group-hover:text-secondary transition-colors">
                  {course.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-4">
                  {course.description}
                </p>

                <div className="flex items-center gap-4 text-xs text-text-muted mb-5">
                  <span className="flex items-center gap-1.5">
                    <Clock size={13} />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Play size={13} />
                    {course.lessons} lessons
                  </span>
                </div>

                <Button variant="secondary" size="sm" disabled={course.comingSoon}>
                  {course.comingSoon ? 'Coming soon' : 'Start course'}
                  {!course.comingSoon && <ArrowRight size={14} />}
                </Button>
              </div>
            ))}
          </div>

          {/* Newsletter CTA */}
          <div className="mt-10 md:mt-14 p-6 md:p-8 rounded-2xl bg-primary border border-border text-center">
            <h3 className="text-lg md:text-xl font-bold text-text-primary mb-2">
              Want to be notified when courses drop?
            </h3>
            <p className="text-sm text-text-secondary mb-5 max-w-md mx-auto">
              Join the newsletter and get notified the moment a new course is available.
            </p>
            <Link href="/newsletter">
              <Button>
                Subscribe to newsletter
                <ArrowRight size={14} />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
