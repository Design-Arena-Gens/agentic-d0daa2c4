'use client';

import { useState } from 'react';
import { Calendar, Clock, Image, Hash, Target, ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';
import { linkedInPosts, contentCalendar, postingGuidelines, additionalStrategies } from './data/content';

export default function Home() {
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  const [expandedPost, setExpandedPost] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'calendar' | 'posts' | 'guidelines'>('calendar');

  const copyToClipboard = (text: string, postId: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(postId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getPostsByWeek = (week: number) => {
    const weekData = contentCalendar.find(w => w.week === week);
    return weekData ? linkedInPosts.filter(post => weekData.posts.includes(post.id)) : [];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 shadow-md border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
            Axeclusive <span className="text-blue-600">LinkedIn Content Hub</span>
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            30-Day Corporate Marketing Strategy for Team Building Excellence
          </p>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex space-x-1 bg-white dark:bg-slate-800 rounded-lg p-1 shadow-md">
          <button
            onClick={() => setActiveTab('calendar')}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition-all ${
              activeTab === 'calendar'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            <Calendar className="inline mr-2 h-5 w-5" />
            Content Calendar
          </button>
          <button
            onClick={() => setActiveTab('posts')}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition-all ${
              activeTab === 'posts'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            All Posts ({linkedInPosts.length})
          </button>
          <button
            onClick={() => setActiveTab('guidelines')}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition-all ${
              activeTab === 'guidelines'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            <Target className="inline mr-2 h-5 w-5" />
            Guidelines
          </button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Calendar View */}
        {activeTab === 'calendar' && (
          <div className="space-y-6">
            {contentCalendar.map((week) => (
              <div
                key={week.week}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden border border-slate-200 dark:border-slate-700"
              >
                <button
                  onClick={() => setSelectedWeek(selectedWeek === week.week ? null : week.week)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">
                      W{week.week}
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                        Week {week.week}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {week.focus}
                      </p>
                    </div>
                  </div>
                  {selectedWeek === week.week ? (
                    <ChevronUp className="h-6 w-6 text-slate-400" />
                  ) : (
                    <ChevronDown className="h-6 w-6 text-slate-400" />
                  )}
                </button>

                {selectedWeek === week.week && (
                  <div className="px-6 pb-6 space-y-4 bg-slate-50 dark:bg-slate-750">
                    {getPostsByWeek(week.week).map((post) => (
                      <PostCard
                        key={post.id}
                        post={post}
                        isExpanded={expandedPost === post.id}
                        onToggle={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                        onCopy={copyToClipboard}
                        isCopied={copiedId === post.id}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* All Posts View */}
        {activeTab === 'posts' && (
          <div className="space-y-4">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 mb-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Complete Post Library
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                {linkedInPosts.length} ready-to-publish LinkedIn posts for your corporate audience
              </p>
            </div>
            {linkedInPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                isExpanded={expandedPost === post.id}
                onToggle={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                onCopy={copyToClipboard}
                isCopied={copiedId === post.id}
              />
            ))}
          </div>
        )}

        {/* Guidelines View */}
        {activeTab === 'guidelines' && (
          <div className="space-y-6">
            {/* Posting Schedule */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                <Clock className="mr-3 text-blue-600" />
                Optimal Posting Schedule
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-3">Best Days</h3>
                  <ul className="space-y-2">
                    {postingGuidelines.bestDays.map((day, idx) => (
                      <li key={idx} className="flex items-center text-slate-700 dark:text-slate-300">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                        {day}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-3">Best Times</h3>
                  <ul className="space-y-2">
                    {postingGuidelines.bestTimes.map((time, idx) => (
                      <li key={idx} className="flex items-center text-slate-700 dark:text-slate-300">
                        <Clock className="mr-3 h-4 w-4 text-blue-600" />
                        {time}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Avoid</h3>
                <ul className="space-y-1">
                  {postingGuidelines.avoidDays.map((item, idx) => (
                    <li key={idx} className="text-slate-700 dark:text-slate-300">• {item}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-slate-700 dark:text-slate-300">
                  <strong>Recommended Frequency:</strong> {postingGuidelines.frequency}
                </p>
                <p className="text-slate-700 dark:text-slate-300 mt-2">
                  <strong>Engagement Strategy:</strong> {postingGuidelines.engagement}
                </p>
              </div>
            </div>

            {/* Additional Strategies */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                <Target className="mr-3 text-blue-600" />
                Additional Growth Strategies
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {additionalStrategies.map((strategy, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-slate-50 dark:bg-slate-750 rounded-lg border border-slate-200 dark:border-slate-600"
                  >
                    <p className="text-slate-700 dark:text-slate-300">
                      <span className="font-semibold text-blue-600 dark:text-blue-400 mr-2">
                        {idx + 1}.
                      </span>
                      {strategy}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Target Audience Reminder */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg p-6 text-white">
              <h2 className="text-2xl font-bold mb-4">Target Audience</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Primary</h3>
                  <ul className="space-y-1">
                    <li>• Corporate offices</li>
                    <li>• HR managers</li>
                    <li>• Team leaders</li>
                    <li>• Event planners</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Key Services</h3>
                  <ul className="space-y-1">
                    <li>• Axe throwing</li>
                    <li>• Splatter paint room</li>
                    <li>• Virtual reality gaming</li>
                    <li>• Corporate events (10-100+ people)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-600 dark:text-slate-400">
          <p>Axeclusive LinkedIn Content Manager • 30-Day Corporate Marketing Strategy</p>
        </div>
      </footer>
    </div>
  );
}

function PostCard({
  post,
  isExpanded,
  onToggle,
  onCopy,
  isCopied
}: {
  post: any;
  isExpanded: boolean;
  onToggle: () => void;
  onCopy: (text: string, id: number) => void;
  isCopied: boolean;
}) {
  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Introduction': 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
      'Educational - Team Building': 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
      'Direct Invite': 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
      'Testimonial': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
      'Feature Highlight - Axe Throwing': 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
      'Feature Highlight - Splatter Paint': 'bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300',
      'Feature Highlight - VR Gaming': 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300',
      'Behind the Scenes': 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
      'Problem/Solution': 'bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300',
      'Seasonal/Timely': 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300',
    };
    return colors[category] || 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300';
  };

  const fullPostText = `${post.caption}\n\n${post.hashtags.join(' ')}\n\n${post.cta}`;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden border border-slate-200 dark:border-slate-700">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors"
      >
        <div className="flex items-center space-x-4 flex-1">
          <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
            {post.id}
          </div>
          <div className="text-left flex-1">
            <div className="flex items-center space-x-3 mb-1">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(post.category)}`}>
                {post.category}
              </span>
              <span className="text-sm text-slate-600 dark:text-slate-400 flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                Day {post.day} • {post.weekday}
              </span>
              <span className="text-sm text-slate-600 dark:text-slate-400 flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {post.postTime}
              </span>
            </div>
            <p className="text-slate-700 dark:text-slate-300 line-clamp-2">
              {post.caption.substring(0, 100)}...
            </p>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-5 w-5 text-slate-400 ml-4" />
        ) : (
          <ChevronDown className="h-5 w-5 text-slate-400 ml-4" />
        )}
      </button>

      {isExpanded && (
        <div className="px-6 pb-6 space-y-4 bg-slate-50 dark:bg-slate-750 border-t border-slate-200 dark:border-slate-600">
          {/* Caption */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Caption</h4>
            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 whitespace-pre-wrap">
              {post.caption}
            </div>
          </div>

          {/* Image Idea */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-2 flex items-center">
              <Image className="h-4 w-4 mr-2 text-blue-600" />
              Image/Video Concept
            </h4>
            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
              <p className="text-slate-700 dark:text-slate-300 italic">{post.imageIdea}</p>
            </div>
          </div>

          {/* Hashtags */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-2 flex items-center">
              <Hash className="h-4 w-4 mr-2 text-blue-600" />
              Hashtags
            </h4>
            <div className="flex flex-wrap gap-2">
              {post.hashtags.map((tag: string, idx: number) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-2 flex items-center">
              <Target className="h-4 w-4 mr-2 text-blue-600" />
              Call to Action
            </h4>
            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
              <p className="text-slate-700 dark:text-slate-300 font-medium">{post.cta}</p>
            </div>
          </div>

          {/* Copy Button */}
          <button
            onClick={() => onCopy(fullPostText, post.id)}
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
          >
            {isCopied ? (
              <>
                <Check className="h-5 w-5 mr-2" />
                Copied to Clipboard!
              </>
            ) : (
              <>
                <Copy className="h-5 w-5 mr-2" />
                Copy Full Post
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
