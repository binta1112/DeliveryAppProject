
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {  
 
  Phone,
  MessageCircle,
  Truck,
  Clock,
  CheckCircle,
  Route,
} from 'lucide-react-native';

  import { useCourierProfile } from '../../hooks/useCourierProfile';

  function SendMessageButton({ onPress }) {
    return (
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Envoyer un message</Text>
      </TouchableOpacity>
    );
  }
/*
  function CourierInfo({ profile }) {
    return (
      <View style={styles.infoBox}>
        <Text style={styles.driverName}>{"Binta" || "Binta"}</Text>
        <Text style={styles.driverName}>Téléphone : <Text style={styles.value}>{driver.phone || "0778757973"}</Text></Text>
        <Text style={styles.driverName}>Type de transport : <Text style={styles.value}>{driver.transportType }</Text></Text>
        <Text style={styles.driverName}>Immatriculation : <Text style={styles.value}>{driver.vehicleRegistration}</Text></Text>
      </View>
    );
  }
*/
  export default function PublicProfile(props) {
    const courierId = props.route?.params?.courierId || '2';
    const { driver, loading, error } = useCourierProfile(courierId);
    console.log("PublicProfile - driver:", driver.transportType, "loading:", loading, "error:", error);
    const handleSendMessage = () => {
      Alert.alert('Message', 'Message envoyé (simulation)');
    };

    return (
       <>
        <View style={styles.container}>
        <Text style={styles.title}>Details du livreur</Text>
        {loading && <ActivityIndicator size="large" color="#ffa600" />}
        {error && <Text style={{ color: 'red' }}>Erreur de chargement</Text>}
        {driver && <CourierInfo profile={driver} />}
        <SendMessageButton onPress={handleSendMessage} />
      </View>
   

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.profileImageContainer}>
              <View style={styles.profileImage}>
                <Text style={styles.profileImageText}>
                  {"Binta"?.charAt(0) || "B"}
                </Text>
              </View>
              <View style={styles.verifiedBadge}>
                <CheckCircle size={20} color="#95E77D" fill="#95E77D" />
              </View>
            </View>

            <View style={styles.profileInfo}>
              <Text style={styles.driverName}>{"Binta" || "Binta"}</Text>
              <View style={styles.ratingContainer}>
                <View style={styles.starsContainer}>
                  {0}
                </View>
                <Text style={styles.ratingText}>
                  {2} / 5
                </Text>
                <Text style={styles.reviewsCount}>
                  ({0} avis)
                </Text>
              </View>
              <View style={styles.transportInfo}>
                <Text style={styles.transportType}>
                  {driver.transportType} • {driver.vehicleRegistration}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton}>
              <Phone size={20} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>Appeler</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.messageButton]}
            >
              <MessageCircle size={20} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>Message</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Statistiques</Text>
          <View style={styles.statsGrid}>
            {renderStatCard(
              <Truck size={24} color="#FF9955" />,
              'Livraisons',
              driver.totalDeliveries?.toString() || "0"
            )}
            {renderStatCard(
              <CheckCircle size={24} color="#95E77D" />,
              'Taux de succès',
              `${driver.successRate || 0}%`
            )}
            {renderStatCard(
              <Clock size={24} color="#4ECDC4" />,
              'Temps réponse',
              `${driver.responseTime || 0}m`
            )}
            {renderStatCard(
              <Route size={24} color="#FF6B6B" />,
              'Distance totale',
              `${driver.totalDistance?.toFixed(0) || 0} km`
            )}
          </View>
        </View>

        {driver.vehicleImages.length > 0 && (
          <View style={styles.vehicleSection}>
            <Text style={styles.sectionTitle}>
              Photos du véhicule
            </Text>
            <FlatList
              data={driver.vehicleImages}
              renderItem={({ item }) => (
                <Image
                  source={{ uri: item }}
                  style={styles.vehicleImage}
                />
              )}
              keyExtractor={(_, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.vehicleList}
            />
          </View>
        )}

        <View style={styles.reviewsSection}>
          <View style={styles.reviewsHeader}>
            <Text style={styles.sectionTitle}>Avis Récents</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllLink}>Voir tous</Text>
            </TouchableOpacity>
          </View>

          {reviews.map((review) => renderReviewCard(review))}
        </View>

        <TouchableOpacity style={styles.orderButton}>
          <Text style={styles.orderButtonText}>
            Passer une commande
          </Text>
        </TouchableOpacity>
      </ScrollView>
 
       </>
  );        
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#FF9955',
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  headerSpacer: {
    width: 40,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  profileImageContainer: {
    position: 'relative',
    marginRight: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FF9955',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImageText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 2,
  },
  profileInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  driverName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 6,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FF9955',
  },
  reviewsCount: {
    fontSize: 12,
    color: '#999',
  },
  transportInfo: {
    marginTop: 4,
  },
  transportType: {
    fontSize: 13,
    color: '#666',
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#FF9955',
    borderRadius: 10,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  messageButton: {
    backgroundColor: '#4ECDC4',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  statsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  statIconContainer: {
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
  },
  vehicleSection: {
    marginBottom: 20,
  },
  vehicleList: {
    gap: 12,
  },
  vehicleImage: {
    width: 200,
    height: 120,
    borderRadius: 12,
  },
  reviewsSection: {
    marginBottom: 20,
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  seeAllLink: {
    color: '#FF9955',
    fontWeight: '700',
    fontSize: 14,
  },
  reviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  reviewAuthor: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF0E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF9955',
  },
  reviewAuthorName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
  },
  reviewDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  reviewRating: {
    flexDirection: 'row',
    gap: 2,
  },
  reviewComment: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  orderButton: {
    backgroundColor: '#FF9955',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  orderButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
