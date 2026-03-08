import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, MapPin, Heart, MessageCircle, User, ChevronRight, ArrowLeft, Check, AlertCircle, Share2, Phone, Flag, Shield, Clock, Users, Briefcase, Baby, Paw } from 'lucide-react';

// ============================================================================
// DESIGN SYSTEM & THEME
// ============================================================================
const COLORS = {
  cream: '#FAF8F3',
  taupe: '#8B8680',
  warmGray: '#D4CECC',
  sage: '#9CAF88',
  coral: '#D97F6F',
  white: '#FFFFFF',
  darkText: '#2C2622',
  lightText: '#5C5652',
};

const theme = {
  colors: COLORS,
  shadows: {
    sm: '0 2px 8px rgba(0, 0, 0, 0.08)',
    md: '0 4px 16px rgba(0, 0, 0, 0.12)',
    lg: '0 12px 24px rgba(0, 0, 0, 0.15)',
  },
};

// ============================================================================
// MAIN APP COMPONENT
// ============================================================================
export default function GenDialUpApp() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [profileData, setProfileData] = useState({});
  const [onboardingStep, setOnboardingStep] = useState(0);

  // Mock data
  const mockMatches = [
    {
      id: 1,
      name: 'Maya',
      age: 32,
      distance: 2.1,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      bio: 'Designer & weekend hiker',
      interests: ['Art', 'Hiking', 'Coffee culture'],
      sharedInterests: ['Coffee culture'],
      verified: true,
      instagramConnected: true,
    },
    {
      id: 2,
      name: 'Jordan',
      age: 35,
      distance: 3.4,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      bio: 'Startup founder, book lover',
      interests: ['Reading', 'Board games', 'Travel'],
      sharedInterests: ['Reading'],
      verified: true,
      linkedinConnected: true,
    },
    {
      id: 3,
      name: 'Alex',
      age: 30,
      distance: 1.8,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
      bio: 'Yoga instructor & photographer',
      interests: ['Yoga', 'Photography', 'Sustainability'],
      sharedInterests: ['Photography'],
      verified: true,
      photoVerified: true,
    },
  ];

  const mockVenues = [
    {
      id: 1,
      name: 'Pressed Coffee',
      vibe: 'Quiet & Cozy',
      distance: 0.8,
      image: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400&h=300&fit=crop',
      open: '7am - 6pm',
    },
    {
      id: 2,
      name: 'Bloom Co-working',
      vibe: 'Energetic',
      distance: 1.2,
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
      open: '8am - 8pm',
    },
    {
      id: 3,
      name: 'The Bookhouse',
      vibe: 'Quiet & Cozy',
      distance: 1.5,
      image: 'https://images.unsplash.com/photo-150784272343-583f20270319?w=400&h=300&fit=crop',
      open: '10am - 7pm',
    },
  ];

  // Screen routing
  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen onGetStarted={() => setCurrentScreen('onboarding')} />;
      case 'onboarding':
        return <OnboardingFlow onComplete={() => setCurrentScreen('matches')} />;
      case 'matches':
        return (
          <MatchesScreen
            matches={mockMatches}
            onSelectMatch={(match) => setCurrentScreen('matchDetails')}
            onNavigate={setCurrentScreen}
          />
        );
      case 'matchDetails':
        return (
          <MatchDetailsScreen
            match={mockMatches[0]}
            onBack={() => setCurrentScreen('matches')}
            onSuggestMeetup={() => setCurrentScreen('meetupPlanning')}
          />
        );
      case 'meetupPlanning':
        return (
          <MeetupPlanningScreen
            venues={mockVenues}
            onConfirm={() => setCurrentScreen('chat')}
            onBack={() => setCurrentScreen('matches')}
          />
        );
      case 'chat':
        return (
          <ChatScreen onBack={() => setCurrentScreen('matches')} />
        );
      case 'venues':
        return (
          <VenueFinderScreen
            venues={mockVenues}
            onNavigate={setCurrentScreen}
          />
        );
      case 'profile':
        return <ProfileScreen onNavigate={setCurrentScreen} />;
      default:
        return <WelcomeScreen />;
    }
  };

  return (
    <div style={{ 
      backgroundColor: COLORS.cream, 
      minHeight: '100vh',
      fontFamily: "'Segoe UI', 'Helvetica Neue', sans-serif",
      color: COLORS.darkText,
    }}>
      {/* Mobile Navigation Header */}
      {currentScreen !== 'welcome' && (
        <MobileHeader
          isMobileMenuOpen={isMobileMenuOpen}
          onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          onNavigate={(screen) => {
            setCurrentScreen(screen);
            setIsMobileMenuOpen(false);
          }}
        />
      )}

      {/* Main Content */}
      <div style={{ position: 'relative' }}>
        {renderScreen()}
      </div>

      {/* Mobile Bottom Navigation */}
      {currentScreen !== 'welcome' && currentScreen !== 'onboarding' && (
        <MobileBottomNav
          currentScreen={currentScreen}
          onNavigate={setCurrentScreen}
        />
      )}

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <MobileMenuOverlay
          onClose={() => setIsMobileMenuOpen(false)}
          onNavigate={(screen) => {
            setCurrentScreen(screen);
            setIsMobileMenuOpen(false);
          }}
        />
      )}
    </div>
  );
}

// ============================================================================
// WELCOME SCREEN
// ============================================================================
function WelcomeScreen({ onGetStarted }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${COLORS.cream} 0%, ${COLORS.warmGray}15 100%)`,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '40px 20px 60px',
      textAlign: 'center',
    }}>
      {/* Hero Section */}
      <div style={{ paddingTop: '60px' }}>
        <div style={{
          fontSize: '48px',
          fontWeight: '700',
          marginBottom: '12px',
          background: `linear-gradient(135deg, ${COLORS.darkText}, ${COLORS.sage})`,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Gen Dial Up
        </div>
        
        <p style={{
          fontSize: '18px',
          color: COLORS.lightText,
          marginBottom: '40px',
          lineHeight: '1.6',
        }}>
          Find your people.<br />Locally.
        </p>

        {/* Feature Pills */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
          marginBottom: '48px',
          maxWidth: '360px',
          margin: '0 auto 48px',
        }}>
          {[
            { icon: '✓', label: 'Quality Matches' },
            { icon: '🔒', label: 'Verified Users' },
            { icon: '📍', label: 'Local Venues' },
            { icon: '❤️', label: 'Platonic Only' },
          ].map((feature, i) => (
            <div
              key={i}
              style={{
                background: COLORS.white,
                padding: '16px 12px',
                borderRadius: '12px',
                boxShadow: theme.shadows.sm,
                fontSize: '13px',
                lineHeight: '1.4',
              }}
            >
              <div style={{ fontSize: '20px', marginBottom: '6px' }}>
                {feature.icon}
              </div>
              {feature.label}
            </div>
          ))}
        </div>
      </div>

      {/* CTA Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <button
          onClick={onGetStarted}
          style={{
            padding: '16px 32px',
            fontSize: '16px',
            fontWeight: '600',
            backgroundColor: COLORS.sage,
            color: COLORS.white,
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: theme.shadows.md,
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = theme.shadows.lg;
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = theme.shadows.md;
          }}
        >
          Get Started
        </button>
        <button
          style={{
            padding: '16px 32px',
            fontSize: '16px',
            fontWeight: '600',
            backgroundColor: 'transparent',
            color: COLORS.sage,
            border: `2px solid ${COLORS.sage}`,
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = `${COLORS.sage}15`;
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
          }}
        >
          Log In
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// ONBOARDING FLOW
// ============================================================================
function OnboardingFlow({ onComplete }) {
  const [step, setStep] = useState(0);

  const slides = [
    {
      title: 'Moved to a new city?',
      description: 'Building friendships as an adult is hard. We get it.',
      emoji: '🏙️',
    },
    {
      title: 'Work from home?',
      description: 'Miss serendipitous connections with colleagues.',
      emoji: '💻',
    },
    {
      title: 'Curated matches',
      description: 'Max 3 per week. Quality over quantity, always.',
      emoji: '✨',
    },
  ];

  const handleNext = () => {
    if (step < slides.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const currentSlide = slides[step];

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '40px 20px 60px',
      background: `linear-gradient(135deg, ${COLORS.warmGray}20 0%, ${COLORS.cream} 100%)`,
    }}>
      {/* Progress Bar */}
      <div style={{
        height: '4px',
        backgroundColor: `${COLORS.taupe}20`,
        borderRadius: '2px',
        overflow: 'hidden',
        marginBottom: '60px',
      }}>
        <div style={{
          height: '100%',
          width: `${((step + 1) / slides.length) * 100}%`,
          backgroundColor: COLORS.sage,
          transition: 'width 0.3s ease',
        }} />
      </div>

      {/* Slide Content */}
      <div style={{ textAlign: 'center', paddingTop: '40px' }}>
        <div style={{ fontSize: '64px', marginBottom: '24px' }}>
          {currentSlide.emoji}
        </div>
        <h2 style={{
          fontSize: '28px',
          fontWeight: '700',
          marginBottom: '16px',
          color: COLORS.darkText,
        }}>
          {currentSlide.title}
        </h2>
        <p style={{
          fontSize: '16px',
          color: COLORS.lightText,
          lineHeight: '1.6',
          maxWidth: '300px',
          margin: '0 auto',
        }}>
          {currentSlide.description}
        </p>
      </div>

      {/* Dots & CTA */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
        }}>
          {slides.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === step ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                backgroundColor: i === step ? COLORS.sage : `${COLORS.taupe}40`,
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          style={{
            padding: '16px 32px',
            fontSize: '16px',
            fontWeight: '600',
            backgroundColor: COLORS.sage,
            color: COLORS.white,
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: theme.shadows.md,
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
          }}
        >
          {step === slides.length - 1 ? 'Continue to Profile' : 'Next'}
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// MATCHES SCREEN (HOME)
// ============================================================================
function MatchesScreen({ matches, onSelectMatch, onNavigate }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animateOut, setAnimateOut] = useState(false);

  const handleInterested = () => {
    setAnimateOut(true);
    setTimeout(() => {
      setCurrentIndex(currentIndex + 1);
      setAnimateOut(false);
    }, 300);
  };

  const handleMaybeLater = () => {
    handleInterested();
  };

  if (currentIndex >= matches.length) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px 20px',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📅</div>
        <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '12px' }}>
          Your matches arrive weekly
        </h2>
        <p style={{ color: COLORS.lightText, marginBottom: '32px' }}>
          Check back next Sunday for fresh connections.
        </p>
      </div>
    );
  }

  const match = matches[currentIndex];

  return (
    <div style={{
      minHeight: '100vh',
      padding: '20px',
      paddingBottom: '100px',
      background: COLORS.cream,
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '32px',
        marginTop: '8px',
      }}>
        <h1 style={{ fontSize: '20px', fontWeight: '700' }}>Your Matches</h1>
        <div style={{
          fontSize: '12px',
          color: COLORS.lightText,
          background: `${COLORS.taupe}15`,
          padding: '6px 12px',
          borderRadius: '20px',
        }}>
          {currentIndex + 1} of {matches.length}
        </div>
      </div>

      {/* Match Card */}
      <div
        style={{
          opacity: animateOut ? 0 : 1,
          transform: animateOut ? 'translateY(20px)' : 'translateY(0)',
          transition: 'all 0.3s ease',
        }}
      >
        <div
          onClick={() => onSelectMatch(match)}
          style={{
            background: COLORS.white,
            borderRadius: '16px',
            overflow: 'hidden',
            marginBottom: '24px',
            boxShadow: theme.shadows.md,
            cursor: 'pointer',
            transition: 'transform 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.02)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          {/* Image */}
          <div style={{
            aspectRatio: '1 / 1',
            background: `url(${match.image}) center / cover`,
            position: 'relative',
          }}>
            {/* Badges Overlay */}
            <div style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              display: 'flex',
              gap: '8px',
              flexWrap: 'wrap',
            }}>
              {match.verified && (
                <div style={{
                  background: COLORS.white,
                  padding: '4px 10px',
                  borderRadius: '20px',
                  fontSize: '11px',
                  fontWeight: '600',
                  color: COLORS.sage,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}>
                  <Check size={14} /> Verified
                </div>
              )}
            </div>
          </div>

          {/* Info Section */}
          <div style={{ padding: '20px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: '8px',
            }}>
              <h3 style={{ fontSize: '20px', fontWeight: '700' }}>
                {match.name}, {match.age}
              </h3>
              <span style={{ fontSize: '13px', color: COLORS.lightText }}>
                <MapPin size={14} style={{ display: 'inline', marginRight: '4px' }} />
                {match.distance} mi
              </span>
            </div>

            <p style={{
              fontSize: '14px',
              color: COLORS.lightText,
              marginBottom: '12px',
            }}>
              {match.bio}
            </p>

            {/* Shared Interest */}
            {match.sharedInterests.length > 0 && (
              <div style={{
                background: `${COLORS.sage}20`,
                padding: '10px 12px',
                borderRadius: '8px',
                marginBottom: '12px',
                fontSize: '13px',
                color: COLORS.sage,
                fontWeight: '600',
              }}>
                ✓ You both love {match.sharedInterests[0]}
              </div>
            )}

            {/* Interest Pills */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              marginBottom: '16px',
            }}>
              {match.interests.slice(0, 3).map((interest, i) => (
                <div
                  key={i}
                  style={{
                    background: `${COLORS.taupe}15`,
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    color: COLORS.lightText,
                  }}
                >
                  {interest}
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
            }}>
              <button
                onClick={handleMaybeLater}
                style={{
                  padding: '12px',
                  fontSize: '14px',
                  fontWeight: '600',
                  backgroundColor: 'transparent',
                  color: COLORS.lightText,
                  border: `2px solid ${COLORS.warmGray}`,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = `${COLORS.taupe}10`;
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                }}
              >
                Maybe Later
              </button>
              <button
                onClick={handleInterested}
                style={{
                  padding: '12px',
                  fontSize: '14px',
                  fontWeight: '600',
                  backgroundColor: COLORS.sage,
                  color: COLORS.white,
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Interested ♥
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Empty State Hint */}
      {currentIndex === matches.length - 1 && (
        <div style={{
          textAlign: 'center',
          padding: '20px',
          backgroundColor: `${COLORS.sage}10`,
          borderRadius: '12px',
          fontSize: '13px',
          color: COLORS.lightText,
        }}>
          You're on the last match! Come back next week for more.
        </div>
      )}
    </div>
  );
}

// ============================================================================
// MATCH DETAILS SCREEN
// ============================================================================
function MatchDetailsScreen({ match, onBack, onSuggestMeetup }) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: COLORS.cream,
      paddingBottom: '100px',
    }}>
      {/* Photo Section */}
      <div style={{ position: 'relative' }}>
        <div
          onClick={onBack}
          style={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            zIndex: 10,
            background: `${COLORS.white}95`,
            borderRadius: '50%',
            width: '44px',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <ArrowLeft size={20} color={COLORS.darkText} />
        </div>

        <div style={{
          aspectRatio: '1 / 1',
          background: `url(${match.image}) center / cover`,
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute',
            bottom: '16px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '6px',
          }}>
            {[0].map((_, i) => (
              <div
                key={i}
                style={{
                  width: i === currentPhotoIndex ? '8px' : '6px',
                  height: '6px',
                  borderRadius: '3px',
                  backgroundColor: COLORS.white,
                  opacity: i === currentPhotoIndex ? 1 : 0.5,
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '24px 20px' }}>
        {/* Name & Age */}
        <div style({ marginBottom: '20px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '4px' }}>
            {match.name}, {match.age}
          </h1>
          <p style={{ fontSize: '14px', color: COLORS.lightText }}>
            <MapPin size={14} style={{ display: 'inline', marginRight: '4px' }} />
            {match.distance} miles away
          </p>
        </div>

        {/* Bio */}
        <p style={{
          fontSize: '15px',
          lineHeight: '1.6',
          color: COLORS.darkText,
          marginBottom: '24px',
        }}>
          {match.bio}
        </p>

        {/* Interests */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '13px', fontWeight: '700', marginBottom: '12px', color: COLORS.lightText }}>
            INTERESTS
          </h3>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
          }}>
            {match.interests.map((interest, i) => (
              <div
                key={i}
                style={{
                  background: `${COLORS.taupe}15`,
                  padding: '8px 14px',
                  borderRadius: '20px',
                  fontSize: '13px',
                  color: COLORS.lightText,
                }}
              >
                {interest}
              </div>
            ))}
          </div>
        </div>

        {/* Verification Badges */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '13px', fontWeight: '700', marginBottom: '12px', color: COLORS.lightText }}>
            VERIFIED
          </h3>
          <div style={{
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
          }}>
            {match.verified && (
              <div style={{
                background: `${COLORS.sage}15`,
                padding: '8px 12px',
                borderRadius: '8px',
                fontSize: '12px',
                color: COLORS.sage,
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}>
                <Check size={14} /> Photo Verified
              </div>
            )}
            {match.instagramConnected && (
              <div style={{
                background: `${COLORS.coral}15`,
                padding: '8px 12px',
                borderRadius: '8px',
                fontSize: '12px',
                color: COLORS.coral,
                fontWeight: '600',
              }}>
                Instagram Connected
              </div>
            )}
          </div>
        </div>

        {/* CTA Buttons */}
        <button
          onClick={onSuggestMeetup}
          style={{
            width: '100%',
            padding: '16px',
            fontSize: '15px',
            fontWeight: '600',
            backgroundColor: COLORS.sage,
            color: COLORS.white,
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            marginBottom: '12px',
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
          }}
        >
          Suggest Meetup
        </button>

        <button
          style={{
            width: '100%',
            padding: '16px',
            fontSize: '15px',
            fontWeight: '600',
            backgroundColor: 'transparent',
            color: COLORS.lightText,
            border: `2px solid ${COLORS.warmGray}`,
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = `${COLORS.taupe}10`;
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
          }}
        >
          Block or Report
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// MEETUP PLANNING SCREEN
// ============================================================================
function MeetupPlanningScreen({ venues, onConfirm, onBack }) {
  const [step, setStep] = useState(0);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const timeSlots = [
    '2:00 PM',
    '2:30 PM',
    '3:00 PM',
    '3:30 PM',
    '4:00 PM',
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: COLORS.cream,
      padding: '20px',
      paddingBottom: '100px',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '32px',
        marginTop: '8px',
      }}>
        <button
          onClick={onBack}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            marginRight: '16px',
          }}
        >
          <ArrowLeft size={24} color={COLORS.darkText} />
        </button>
        <h1 style={{ fontSize: '20px', fontWeight: '700' }}>Plan Your Meetup</h1>
      </div>

      {/* Step Indicator */}
      <div style={{
        display: 'flex',
        gap: '8px',
        marginBottom: '32px',
      }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: '4px',
              backgroundColor: i <= step ? COLORS.sage : `${COLORS.taupe}20`,
              borderRadius: '2px',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>

      {/* Step 1: Select Venue */}
      {step === 0 && (
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px' }}>
            Choose a venue
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {venues.map((venue) => (
              <div
                key={venue.id}
                onClick={() => {
                  setSelectedVenue(venue);
                  setStep(1);
                }}
                style={{
                  background: COLORS.white,
                  borderRadius: '12px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: theme.shadows.sm,
                  border: selectedVenue?.id === venue.id ? `2px solid ${COLORS.sage}` : '2px solid transparent',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = theme.shadows.md;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = theme.shadows.sm;
                }}
              >
                <div
                  style={{
                    height: '140px',
                    background: `url(${venue.image}) center / cover`,
                  }}
                />
                <div style={{ padding: '16px' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '8px',
                  }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '700' }}>
                      {venue.name}
                    </h3>
                    <span style={{ fontSize: '13px', color: COLORS.lightText }}>
                      {venue.distance} mi
                    </span>
                  </div>
                  <p style={{ fontSize: '13px', color: COLORS.lightText }}>
                    {venue.vibe}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Select Time */}
      {step === 1 && (
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px' }}>
            What time works?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {timeSlots.map((time, i) => (
              <button
                key={i}
                onClick={() => {
                  setSelectedTime(time);
                  setStep(2);
                }}
                style={{
                  padding: '16px',
                  borderRadius: '12px',
                  border: selectedTime === time ? `2px solid ${COLORS.sage}` : `2px solid ${COLORS.warmGray}`,
                  backgroundColor: selectedTime === time ? `${COLORS.sage}15` : COLORS.white,
                  cursor: 'pointer',
                  fontSize: '15px',
                  fontWeight: '600',
                  color: COLORS.darkText,
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = `${COLORS.sage}15`;
                }}
                onMouseLeave={(e) => {
                  if (selectedTime !== time) {
                    e.target.style.backgroundColor = COLORS.white;
                  }
                }}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Confirm */}
      {step === 2 && (
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '24px' }}>
            Confirm your meetup
          </h2>
          <div style={{
            background: COLORS.white,
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '24px',
            boxShadow: theme.shadows.sm,
          }}>
            <div style={{ marginBottom: '16px' }}>
              <p style={{ fontSize: '12px', color: COLORS.lightText, marginBottom: '4px' }}>
                VENUE
              </p>
              <p style={{ fontSize: '16px', fontWeight: '700' }}>
                {selectedVenue?.name}
              </p>
            </div>
            <div>
              <p style={{ fontSize: '12px', color: COLORS.lightText, marginBottom: '4px' }}>
                TIME
              </p>
              <p style={{ fontSize: '16px', fontWeight: '700' }}>
                Tomorrow at {selectedTime}
              </p>
            </div>
          </div>

          <button
            onClick={onConfirm}
            style={{
              width: '100%',
              padding: '16px',
              fontSize: '15px',
              fontWeight: '600',
              backgroundColor: COLORS.sage,
              color: COLORS.white,
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
            }}
          >
            Confirm Meetup
          </button>
        </div>
      )}

      {/* Back Button */}
      {step > 0 && (
        <button
          onClick={() => setStep(step - 1)}
          style={{
            marginTop: '12px',
            width: '100%',
            padding: '12px',
            fontSize: '14px',
            fontWeight: '600',
            backgroundColor: 'transparent',
            color: COLORS.lightText,
            border: `2px solid ${COLORS.warmGray}`,
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = `${COLORS.taupe}10`;
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
          }}
        >
          Back
        </button>
      )}
    </div>
  );
}

// ============================================================================
// CHAT SCREEN
// ============================================================================
function ChatScreen({ onBack }) {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Maya', text: 'Hey! Excited for coffee tomorrow 😊', isUser: false },
    { id: 2, sender: 'You', text: 'Me too! See you at Pressed at 2?', isUser: true },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (inputValue.trim()) {
      setMessages([
        ...messages,
        { id: messages.length + 1, sender: 'You', text: inputValue, isUser: true },
      ]);
      setInputValue('');
    }
  };

  const icebreakers = [
    'Tell me about your recent hike 🥾',
    "What's your favorite coffee spot? ☕",
    'Any book recommendations? 📚',
  ];

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: COLORS.cream,
    }}>
      {/* Header */}
      <div style={{
        padding: '16px 20px',
        borderBottom: `1px solid ${COLORS.warmGray}30`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: COLORS.white,
      }}>
        <button
          onClick={onBack}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <ArrowLeft size={24} color={COLORS.darkText} />
        </button>
        <h2 style={{ fontSize: '16px', fontWeight: '700', flex: 1, textAlign: 'center' }}>
          Maya
        </h2>
        <div style={{ width: '24px' }} />
      </div>

      {/* Messages */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              display: 'flex',
              justifyContent: msg.isUser ? 'flex-end' : 'flex-start',
            }}
          >
            <div
              style={{
                maxWidth: '80%',
                padding: '12px 16px',
                borderRadius: '16px',
                backgroundColor: msg.isUser ? COLORS.sage : `${COLORS.taupe}15`,
                color: msg.isUser ? COLORS.white : COLORS.darkText,
                fontSize: '15px',
                lineHeight: '1.4',
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Icebreaker Chips */}
      <div style={{
        padding: '16px 20px',
        borderTop: `1px solid ${COLORS.warmGray}30`,
        background: COLORS.white,
      }}>
        <p style={{ fontSize: '12px', color: COLORS.lightText, marginBottom: '12px' }}>
          Suggested icebreakers:
        </p>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}>
          {icebreakers.map((icebreaker, i) => (
            <button
              key={i}
              onClick={() => {
                setInputValue(icebreaker);
              }}
              style={{
                padding: '10px 12px',
                borderRadius: '8px',
                border: `1px solid ${COLORS.warmGray}`,
                backgroundColor: COLORS.white,
                fontSize: '13px',
                color: COLORS.lightText,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textAlign: 'left',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = `${COLORS.sage}10`;
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = COLORS.white;
              }}
            >
              {icebreaker}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div style={{
        padding: '12px 20px 20px',
        background: COLORS.white,
        borderTop: `1px solid ${COLORS.warmGray}30`,
        display: 'flex',
        gap: '12px',
      }}>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Your message..."
          style={{
            flex: 1,
            padding: '12px 16px',
            borderRadius: '24px',
            border: `1px solid ${COLORS.warmGray}`,
            fontSize: '15px',
            fontFamily: 'inherit',
            color: COLORS.darkText,
          }}
        />
        <button
          onClick={handleSend}
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            backgroundColor: COLORS.sage,
            color: COLORS.white,
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
          }}
        >
          <MessageCircle size={20} />
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// VENUE FINDER SCREEN
// ============================================================================
function VenueFinderScreen({ venues, onNavigate }) {
  const [viewMode, setViewMode] = useState('list');

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: COLORS.cream,
      paddingBottom: '100px',
    }}>
      {/* Header */}
      <div style={{
        padding: '20px',
        marginTop: '8px',
      }}>
        <h1 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px' }}>
          Our Partner Venues
        </h1>
        <div style={{
          display: 'flex',
          gap: '8px',
        }}>
          {['list', 'map'].map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: `2px solid ${mode === viewMode ? COLORS.sage : COLORS.warmGray}`,
                backgroundColor: mode === viewMode ? `${COLORS.sage}15` : 'transparent',
                color: mode === viewMode ? COLORS.sage : COLORS.lightText,
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              {mode === 'list' ? 'List' : 'Map'}
            </button>
          ))}
        </div>
      </div>

      {/* List View */}
      {viewMode === 'list' && (
        <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {venues.map((venue) => (
            <div
              key={venue.id}
              style={{
                background: COLORS.white,
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: theme.shadows.sm,
              }}
            >
              <div
                style={{
                  height: '120px',
                  background: `url(${venue.image}) center / cover`,
                }}
              />
              <div style={{ padding: '16px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '4px' }}>
                  {venue.name}
                </h3>
                <p style={{ fontSize: '13px', color: COLORS.lightText, marginBottom: '12px' }}>
                  {venue.vibe} • {venue.open}
                </p>
                <button
                  style={{
                    width: '100%',
                    padding: '10px',
                    fontSize: '13px',
                    fontWeight: '600',
                    backgroundColor: `${COLORS.sage}15`,
                    color: COLORS.sage,
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = COLORS.sage;
                    e.target.style.color = COLORS.white;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = `${COLORS.sage}15`;
                    e.target.style.color = COLORS.sage;
                  }}
                >
                  Suggest Meetup
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Map View Placeholder */}
      {viewMode === 'map' && (
        <div style={{
          padding: '20px',
          background: `${COLORS.taupe}10`,
          borderRadius: '12px',
          textAlign: 'center',
          margin: '0 20px',
          marginBottom: '32px',
          minHeight: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: COLORS.lightText,
        }}>
          <div>
            <MapPin size={48} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
            <p>Google Maps integration coming soon</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// PROFILE SCREEN
// ============================================================================
function ProfileScreen({ onNavigate }) {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: COLORS.cream,
      paddingBottom: '100px',
    }}>
      {/* Header */}
      <div style({
        padding: '20px',
        marginTop: '8px',
      }}>
        <h1 style={{ fontSize: '20px', fontWeight: '700' }}>Your Profile</h1>
      </div>

      {/* Profile Card */}
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{
          background: COLORS.white,
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: theme.shadows.sm,
        }}>
          <div
            style={{
              height: '200px',
              background: 'url(https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=300&fit=crop) center / cover',
            }}
          />
          <div style={{ padding: '20px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '4px' }}>
              Your Name, 31
            </h2>
            <p style={{ fontSize: '13px', color: COLORS.lightText, marginBottom: '16px' }}>
              Designer & coffee enthusiast
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
            }}>
              <button
                style={{
                  padding: '10px',
                  fontSize: '13px',
                  fontWeight: '600',
                  backgroundColor: COLORS.sage,
                  color: COLORS.white,
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                }}
              >
                Edit Profile
              </button>
              <button
                style={{
                  padding: '10px',
                  fontSize: '13px',
                  fontWeight: '600',
                  backgroundColor: `${COLORS.taupe}15`,
                  color: COLORS.lightText,
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                }}
              >
                Settings
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={{
          background: COLORS.white,
          borderRadius: '12px',
          padding: '16px',
          boxShadow: theme.shadows.sm,
        }}>
          <p style={{ fontSize: '12px', fontWeight: '600', color: COLORS.lightText, marginBottom: '12px' }}>
            YOUR STATS
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
          }}>
            <div>
              <p style={{ fontSize: '20px', fontWeight: '700' }}>3</p>
              <p style={{ fontSize: '12px', color: COLORS.lightText }}>Meetups</p>
            </div>
            <div>
              <p style={{ fontSize: '20px', fontWeight: '700' }}>12</p>
              <p style={{ fontSize: '12px', color: COLORS.lightText }}>Connections</p>
            </div>
          </div>
        </div>

        {/* Links */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}>
          {['Help & Support', 'Privacy Policy', 'Logout'].map((item, i) => (
            <button
              key={i}
              style={{
                padding: '16px',
                backgroundColor: COLORS.white,
                border: 'none',
                borderRadius: '12px',
                fontSize: '15px',
                fontWeight: '600',
                color: COLORS.darkText,
                cursor: 'pointer',
                textAlign: 'left',
                boxShadow: theme.shadows.sm,
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = `${COLORS.taupe}10`;
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = COLORS.white;
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MOBILE HEADER
// ============================================================================
function MobileHeader({ isMobileMenuOpen, onMenuToggle, onNavigate }) {
  return (
    <div style={{
      padding: '12px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: COLORS.white,
      borderBottom: `1px solid ${COLORS.warmGray}30`,
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <h1 style={{
        fontSize: '16px',
        fontWeight: '700',
        margin: 0,
      }}>
        Gen Dial Up
      </h1>
      <button
        onClick={onMenuToggle}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '8px',
        }}
      >
        {isMobileMenuOpen ? (
          <X size={24} color={COLORS.darkText} />
        ) : (
          <Menu size={24} color={COLORS.darkText} />
        )}
      </button>
    </div>
  );
}

// ============================================================================
// MOBILE BOTTOM NAVIGATION
// ============================================================================
function MobileBottomNav({ currentScreen, onNavigate }) {
  const navItems = [
    { id: 'matches', label: 'Matches', icon: <Heart size={20} /> },
    { id: 'chat', label: 'Chat', icon: <MessageCircle size={20} /> },
    { id: 'venues', label: 'Venues', icon: <MapPin size={20} /> },
    { id: 'profile', label: 'Profile', icon: <User size={20} /> },
  ];

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      backgroundColor: COLORS.white,
      borderTop: `1px solid ${COLORS.warmGray}30`,
      zIndex: 50,
    }}>
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          style={{
            padding: '12px 0',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            color: currentScreen === item.id ? COLORS.sage : COLORS.lightText,
            fontSize: '11px',
            fontWeight: '600',
            transition: 'all 0.3s ease',
          }}
        >
          {item.icon}
          {item.label}
        </button>
      ))}
    </div>
  );
}

// ============================================================================
// MOBILE MENU OVERLAY
// ============================================================================
function MobileMenuOverlay({ onClose, onNavigate }) {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: `${COLORS.darkText}60`,
      zIndex: 40,
      animation: 'fadeIn 0.3s ease',
    }} onClick={onClose}>
      <div
        style={{
          position: 'fixed',
          top: '60px',
          right: '0',
          width: '250px',
          backgroundColor: COLORS.white,
          boxShadow: theme.shadows.lg,
          padding: '20px 0',
          animation: 'slideIn 0.3s ease',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {['Matches', 'Chat', 'Venues', 'Profile', 'Settings', 'Help'].map((item, i) => (
          <button
            key={i}
            onClick={() => {
              onNavigate(item.toLowerCase());
              onClose();
            }}
            style={{
              width: '100%',
              padding: '12px 20px',
              textAlign: 'left',
              fontSize: '15px',
              fontWeight: '500',
              color: COLORS.darkText,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              borderBottom: `1px solid ${COLORS.warmGray}20`,
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = `${COLORS.sage}10`;
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
            }}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
